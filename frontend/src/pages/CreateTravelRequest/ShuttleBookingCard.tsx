import { useState } from 'react';
import { MapPin, Users, Calendar, Clock, CreditCard, Bus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ShuttleBookingCard = () => {
  const [pickupLocation, setPickupLocation] = useState('OR Tambo International Airport');
  const [dropoffLocation, setDropoffLocation] = useState('Sandton City Mall');
  const [bookingDate, setBookingDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [shuttleType, setShuttleType] = useState('Shared');
  const [luggage, setLuggage] = useState('1');
  const [contactNumber, setContactNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const calculatePrice = () => {
    const basePrice = shuttleType === 'Private' ? 350 : 120;
    const passengerMultiplier = shuttleType === 'Private' ? 1 : parseInt(passengers);
    const luggageExtra = parseInt(luggage) > 2 ? (parseInt(luggage) - 2) * 25 : 0;
    return (basePrice * passengerMultiplier) + luggageExtra;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Bus className="text-blue-600" />
          Shuttle Booking Details
        </CardTitle>
        <p className="text-muted-foreground">Book your reliable shuttle service across South Africa</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Pickup Location */}
            <div className="flex items-center space-x-2">
              <MapPin className="text-green-600 text-xl" />
              <div className="flex-1 space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter pickup location"
                />
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="flex items-center space-x-2">
              <MapPin className="text-red-600 text-xl" />
              <div className="flex-1 space-y-2">
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Input
                  id="dropoff"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Enter dropoff location"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center space-x-2 w-full">
                <Calendar className="text-blue-600 text-xl" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full">
                <Clock className="text-blue-600 text-xl" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div className="flex items-center space-x-2">
              <div className="text-blue-600 text-xl">📱</div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
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
            {/* Shuttle Type */}
            {/* <div className="flex items-center space-x-2">
              <Bus className="text-blue-600 text-xl" />
              <div className="flex-1 space-y-2">
                <Label>Shuttle Type</Label>
                <Select value={shuttleType} onValueChange={setShuttleType}>
                  <SelectTrigger className='bg-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="Shared">Shared Shuttle</SelectItem>
                    <SelectItem value="Private">Private Shuttle</SelectItem>
                    <SelectItem value="Airport Express">Airport Express</SelectItem>
                    <SelectItem value="Long Distance">Long Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div> */}

            {/* Passengers and Luggage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="text-blue-600 text-xl" />
                <div className="flex-1 space-y-2">
                  <Label>Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
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
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-blue-600 text-xl">🧳</div>
                <div className="flex-1 space-y-2">
                  <Label>Luggage</Label>
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
            </div>

            {/* Special Requests */}
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 text-xl mt-2">💬</div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="requests">Special Requests</Label>
                <Textarea
                  id="requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Child seat, wheelchair accessible, etc."
                  rows={3}
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Service Type:</span>
                    <span className="text-muted-foreground">{shuttleType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Passengers:</span>
                    <span className="text-muted-foreground">{passengers}</span>
                  </div>
                  {parseInt(luggage) > 2 && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Extra Luggage:</span>
                      <span className="text-muted-foreground">R{(parseInt(luggage) - 2) * 25}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg flex items-center gap-1">
                      <CreditCard className="text-green-600" />
                      Total Price:
                    </span>
                    <span className="text-xl font-bold text-green-600">R{calculatePrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Book Button */}
        <Button className="w-full" size="lg">
          <Bus className="mr-2 h-4 w-4" />
          Book Shuttle Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShuttleBookingCard;