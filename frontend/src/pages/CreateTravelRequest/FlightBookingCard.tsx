import { useState } from 'react';
import { Plane, CreditCard, ArrowRightLeft, } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FlightBookingCard = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [departureCity, setDepartureCity] = useState('Cape Town (CPT)');
  const [arrivalCity, setArrivalCity] = useState('Johannesburg (JNB)');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [departureTime, setDepartureTime] = useState('morning');
  const [returnTime, setReturnTime] = useState('evening');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [infants, setInfants] = useState('0');
  const [classType, setClassType] = useState('Economy');
  const [luggage, setLuggage] = useState('1');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // South African cities with airport codes
  const southAfricanCities = [
    'Cape Town (CPT)',
    'Johannesburg (JNB)',
    'Durban (DUR)',
    'Port Elizabeth (PLZ)',
    'Bloemfontein (BFN)',
    'East London (ELS)',
    'George (GRJ)',
    'Kimberley (KIM)',
    'Nelspruit (MQP)',
    'Pietermaritzburg (PZB)',
    'Polokwane (PTG)',
    'Richards Bay (RCB)',
    'Upington (UTN)'
  ];

  const calculatePrice = () => {
    const basePrice = classType === 'Business' ? 2500 : classType === 'Premium Economy' ? 1800 : 1200;
    const totalPassengers = parseInt(adults) + parseInt(children) + (parseInt(infants) * 0.1);
    const tripMultiplier = tripType === 'round-trip' ? 2 : 1;
    const luggageExtra = parseInt(luggage) > 1 ? (parseInt(luggage) - 1) * 350 : 0;

    return Math.round((basePrice * totalPassengers * tripMultiplier) + luggageExtra);
  };

  const swapCities = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plane className="text-blue-600" />
          Flight Booking
        </CardTitle>
        <p className="text-muted-foreground">Book domestic and international flights from South Africa</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Trip Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Trip Type</Label>
            <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way">One Way</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi-city" id="multi-city" />
                <Label htmlFor="multi-city">Multi City</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Flight Route */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="departure">From</Label>
                    <Select value={departureCity} onValueChange={setDepartureCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {southAfricanCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapCities}
                    className="mt-8"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 space-y-2">
                    <Label htmlFor="arrival">To</Label>
                    <Select value={arrivalCity} onValueChange={setArrivalCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {southAfricanCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure-date">Departure Date</Label>
                  <Input
                    id="departure-date"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>

                {tripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label htmlFor="return-date">Return Date</Label>
                    <Input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Preferred Times */}
              <div className="flex gap-4 flex-wrap">
                <div className="space-y-2">
                  <Label>Departure Time Preference</Label>
                  <Select value={departureTime} onValueChange={setDepartureTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early-morning">Early Morning (06:00-09:00)</SelectItem>
                      <SelectItem value="morning">Morning (09:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12:00-17:00)</SelectItem>
                      <SelectItem value="evening">Evening (17:00-21:00)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {tripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label>Return Time Preference</Label>
                    <Select value={returnTime} onValueChange={setReturnTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early-morning">Early Morning (06:00-09:00)</SelectItem>
                        <SelectItem value="morning">Morning (09:00-12:00)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12:00-17:00)</SelectItem>
                        <SelectItem value="evening">Evening (17:00-21:00)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Passengers */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Passengers</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Adults (12+)</Label>
                    <Select value={adults} onValueChange={setAdults}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Children (2-11)</Label>
                    <Select value={children} onValueChange={setChildren}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Infants (0-2)</Label>
                    <Select value={infants} onValueChange={setInfants}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Class and Luggage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={classType} onValueChange={setClassType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Checked Bags</Label>
                  <Select value={luggage} onValueChange={setLuggage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} bag{num !== 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <Textarea
                  id="special-requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Meal preferences, wheelchair assistance, etc."
                  rows={3}
                />
              </div>

              {/* Price Breakdown */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Trip Type:</span>
                      <span className="text-muted-foreground capitalize">{tripType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Class:</span>
                      <span className="text-muted-foreground">{classType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Passengers:</span>
                      <span className="text-muted-foreground">
                        {adults} Adult{adults !== '1' ? 's' : ''}
                        {children !== '0' && `, ${children} Child${children !== '1' ? 'ren' : ''}`}
                        {infants !== '0' && `, ${infants} Infant${infants !== '1' ? 's' : ''}`}
                      </span>
                    </div>
                    {parseInt(luggage) > 1 && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Extra Luggage:</span>
                        <span className="text-muted-foreground">R{(parseInt(luggage) - 1) * 350}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg flex items-center gap-1">
                        <CreditCard className="text-green-600" />
                        Estimated Total:
                      </span>
                      <span className="text-xl font-bold text-green-600">R{calculatePrice()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Final price may vary based on airline, taxes, and fees
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Search/Book Button */}
          <Button className="w-full" size="lg">
            <Plane className="mr-2 h-4 w-4" />
            Search Flights
          </Button>

        </div>
      </CardContent>
    </Card>
  );
};

export default FlightBookingCard;