import React, { useState, useEffect } from 'react';

// Global base URL - edit this as needed
const BASE_URL = 'http://localhost:3001/api';

// TypeScript interfaces
interface User {
  id: string;
  name: string;
  email: string;
  employeeType: 'employee' | 'line_manager' | 'admin';
  department: string;
  company: string;
  manager?: string;
}

interface TravelRequest {
  id: string;
  employeeId?: string;
  employeeName?: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed' | 'cancelled';
  estimatedCost: number;
  actualCost?: number;
  transportation: {
    type: 'flight' | 'car_rental' | 'uber' | 'bus';
    details: {
      departureTime?: string;
      returnTime?: string;
      preferences?: string;
    };
  };
  accommodation: {
    required: boolean;
    preferences?: string;
    checkIn: string;
    checkOut: string;
  };
  submittedAt: string;
  approvedAt?: string;
  processedAt?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface CreateTravelRequest {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  estimatedCost: number;
  transportation: {
    type: 'flight' | 'car_rental' | 'uber' | 'bus';
    details: {
      departureTime?: string;
      returnTime?: string;
      preferences?: string;
    };
  };
  accommodation: {
    required: boolean;
    preferences?: string;
    checkIn: string;
    checkOut: string;
  };
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

const Test: React.FC = () => {
  const [results, setResults] = useState<{ [key: string]: ApiResponse }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState<LoginCredentials>({ email: '', password: '' });
  const [travelRequestForm, setTravelRequestForm] = useState<CreateTravelRequest>({
    destination: 'Cape Town',
    startDate: '2025-07-15',
    endDate: '2025-07-20',
    purpose: 'Client meeting',
    estimatedCost: 5000,
    transportation: {
      type: 'flight',
      details: {
        departureTime: '08:00',
        returnTime: '18:00',
        preferences: 'Economy class'
      }
    },
    accommodation: {
      required: true,
      preferences: 'Business hotel near city center',
      checkIn: '2025-07-15',
      checkOut: '2025-07-20'
    }
  });

  // Generic API call function
  const apiCall = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    testKey?: string
  ): Promise<ApiResponse> => {
    const key = testKey || `${method}-${endpoint}`;
    setLoading(prev => ({ ...prev, [key]: true }));

    try {
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for JWT
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();

      const result: ApiResponse = {
        success: response.ok,
        data,
        status: response.status,
        error: response.ok ? undefined : data.message || 'Request failed'
      };

      setResults(prev => ({ ...prev, [key]: result }));
      return result;
    } catch (error) {
      const result: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        status: 0
      };
      setResults(prev => ({ ...prev, [key]: result }));
      return result;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  // Authentication functions
  const testLogin = async () => {
    const result = await apiCall('/auth/login', 'POST', loginForm, 'login');
    if (result.success) {
      // After successful login, get user profile
      await testGetProfile();
    }
  };

  const testLogout = async () => {
    await apiCall('/auth/logout', 'POST', {}, 'logout');
    setCurrentUser(null);
  };

  // User profile functions
  const testGetProfile = async () => {
    const result = await apiCall('/users/profile', 'GET', undefined, 'get-profile');
    if (result.success && result.data) {
      setCurrentUser(result.data);
    }
  };

  const testUpdateProfile = async () => {
    const updateData = {
      name: 'John Smith Updated',
      phone: '+27123456789',
      preferences: {
        notifications: true,
        preferredTransportation: 'flight'
      }
    };
    await apiCall('/users/profile', 'PUT', updateData, 'update-profile');
  };

  // Travel request functions
  const testCreateTravelRequest = async () => {
    await apiCall('/travel/request', 'POST', travelRequestForm, 'create-travel-request');
  };

  const testGetTravelRequests = async () => {
    await apiCall('/travel/requests', 'GET', undefined, 'get-travel-requests');
  };

  const testGetTravelRequestById = async (id: string = 'travel-req-123') => {
    await apiCall(`/travel/requests/${id}`, 'GET', undefined, 'get-travel-request-by-id');
  };

  const testUpdateTravelRequest = async (id: string = 'travel-req-123') => {
    const updateData = {
      ...travelRequestForm,
      purpose: 'Updated client meeting',
      estimatedCost: 5500
    };
    await apiCall(`/travel/requests/${id}`, 'PUT', updateData, 'update-travel-request');
  };

  const testDeleteTravelRequest = async (id: string = 'travel-req-123') => {
    await apiCall(`/travel/requests/${id}`, 'DELETE', undefined, 'delete-travel-request');
  };

  const testUpdateRequestStatus = async (id: string = 'travel-req-123') => {
    const statusUpdate = {
      status: 'approved',
      comments: 'Approved for business meeting',
      modifications: {
        estimatedCost: 4500,
        notes: 'Reduced accommodation budget'
      }
    };
    await apiCall(`/travel/requests/${id}/status`, 'PUT', statusUpdate, 'update-request-status');
  };

  const testGetPendingApprovals = async () => {
    await apiCall('/travel/pending-approvals', 'GET', undefined, 'get-pending-approvals');
  };

  const testProcessTravelRequest = async (id: string = 'travel-req-123') => {
    const processData = {
      bookingDetails: {
        transportation: {
          confirmationNumber: 'FL123456',
          cost: 2500
        },
        accommodation: {
          confirmationNumber: 'HTL789012',
          cost: 2000
        }
      },
      totalCost: 4500
    };
    await apiCall(`/travel/requests/${id}/process`, 'POST', processData, 'process-travel-request');
  };

  const renderResult = (key: string) => {
    const result = results[key];
    const isLoading = loading[key];

    if (isLoading) {
      return <div className="text-blue-500">Loading...</div>;
    }

    if (!result) {
      return <div className="text-gray-400">Not tested</div>;
    }

    return (
      <div className={`p-2 rounded text-sm ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <div className="font-semibold">Status: {result.status}</div>
        {result.success ? (
          <div>✅ Success</div>
        ) : (
          <div>❌ Error: {result.error}</div>
        )}
        {result.data && (
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Response Data</summary>
            <pre className="mt-1 text-xs overflow-x-auto bg-white p-2 rounded">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  };

  const clearResults = () => {
    setResults({});
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Travel Management API Test</h1>
          <div className="flex gap-2">
            <div className="text-sm text-gray-600">Base URL: <code className="bg-gray-100 px-2 py-1 rounded">{BASE_URL}</code></div>
            <button
              onClick={clearResults}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
        </div>

        {currentUser && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Current User:</h3>
            <p className="text-blue-700">{currentUser.name} ({currentUser.email}) - {currentUser.employeeType}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Authentication</h2>

            <div className="space-y-2">
              <h3 className="font-medium">Login</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={testLogin}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Test Login
                </button>
              </div>
              {renderResult('login')}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Logout</h3>
                <button
                  onClick={testLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Test Logout
                </button>
              </div>
              {renderResult('logout')}
            </div>
          </section>

          {/* User Profile Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">User Profile</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Get Profile</h3>
                <button
                  onClick={testGetProfile}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Test Get Profile
                </button>
              </div>
              {renderResult('get-profile')}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Update Profile</h3>
                <button
                  onClick={testUpdateProfile}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Test Update Profile
                </button>
              </div>
              {renderResult('update-profile')}
            </div>
          </section>

          {/* Travel Requests Section */}
          <section className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Travel Requests</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Create Request</h3>
                  <button
                    onClick={testCreateTravelRequest}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('create-travel-request')}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Get All Requests</h3>
                  <button
                    onClick={testGetTravelRequests}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('get-travel-requests')}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Get Request by ID</h3>
                  <button
                    onClick={() => testGetTravelRequestById()}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('get-travel-request-by-id')}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Update Request</h3>
                  <button
                    onClick={() => testUpdateTravelRequest()}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('update-travel-request')}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Delete Request</h3>
                  <button
                    onClick={() => testDeleteTravelRequest()}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('delete-travel-request')}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Update Status</h3>
                  <button
                    onClick={() => testUpdateRequestStatus()}
                    className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                  >
                    Test
                  </button>
                </div>
                {renderResult('update-request-status')}
              </div>
            </div>
          </section>

          {/* Manager/Admin Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Manager/Admin Functions</h2>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Pending Approvals</h3>
                <button
                  onClick={testGetPendingApprovals}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Test
                </button>
              </div>
              {renderResult('get-pending-approvals')}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Process Request</h3>
                <button
                  onClick={() => testProcessTravelRequest()}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Test
                </button>
              </div>
              {renderResult('process-travel-request')}
            </div>
          </section>

          {/* Test All Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Batch Testing</h2>

            <div className="space-y-2">
              <button
                onClick={async () => {
                  // Test all endpoints in sequence (except login which requires credentials)
                  if (currentUser) {
                    await Promise.all([
                      testGetProfile(),
                      testGetTravelRequests(),
                      testGetPendingApprovals(),
                    ]);
                  }
                }}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                Test All Read Operations
              </button>

              <p className="text-sm text-gray-600">
                Note: Some operations require specific user roles or existing data.
                Make sure to login first and have appropriate permissions.
              </p>
            </div>
          </section>
        </div>

        {/* Travel Request Form Preview */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Travel Request Form Data</h2>
          <details>
            <summary className="cursor-pointer font-medium text-gray-600">View/Edit Travel Request Form Data</summary>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(travelRequestForm, null, 2)}
              </pre>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
};

export default Test;