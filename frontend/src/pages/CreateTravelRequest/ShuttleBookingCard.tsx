import { useEffect } from 'react';
import { MapPin, Users, Calendar, Clock, CreditCard, Bus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRequests } from '@/states/useRequests';

const ShuttleBookingCard = () => {
  // const [pickupLocation, setPickupLocation] = useState('OR Tambo International Airport');
  // const [dropoffLocation, setDropoffLocation] = useState('Sandton City Mall');
  // const [bookingDate, setBookingDate] = useState('');
  // const [pickupTime, setPickupTime] = useState('');
  // const [passengers, setPassengers] = useState('1');
  // const [shuttleType] = useState('Shared');
  // const [luggage, setLuggage] = useState('1');
  // const [contactNumber, setContactNumber] = useState('');
  // const [specialRequests, setSpecialRequests] = useState('');

  const {
    shuttleCompany, shuttleDate, shuttleDropOffLocation, shuttleLuggage,
    shuttlePassengers, shuttlePickUpLocation, shuttlePickUpTime, shuttleSpecialRequests, shuttleTotalPrice,
    setShuttleTotalPrice, setShuttleDate, setShuttleDropOffLocation, setShuttleLuggage,
    setShuttlePassengers, setShuttlePickUpLocation, setShuttlePickUpTime, setShuttleSpecialRequests,
    setShuttleCompany
  } = useRequests();

  useEffect(() => {
    // Calculate price whenever the relevant fields change
    const basePrice = shuttleCompany === 'intercape' ? 300 :
      shuttleCompany === 'greyhound' ? 350 :
        shuttleCompany === 'translux' ? 400 :
          shuttleCompany === 'eldos' ? 250 :
            shuttleCompany === 'citiliner' ? 280 :
              shuttleCompany === 'bazbus' ? 200 : 0;

    const luggageExtra = (shuttleLuggage ?? 0) > 2 ? ((shuttleLuggage ?? 0) - 2) * 25 : 0;
    const price = (basePrice * (shuttlePassengers ?? 1)) + luggageExtra;

    setShuttleTotalPrice(price);
  }, [shuttleCompany, shuttlePassengers, shuttleLuggage, setShuttleTotalPrice]);

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
                  value={shuttlePickUpLocation}
                  onChange={(e) => setShuttlePickUpLocation?.(e.target.value)}
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
                  value={shuttleDropOffLocation}
                  onChange={(e) => setShuttleDropOffLocation?.(e.target.value)}
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
                    value={shuttleDate ? shuttleDate.toISOString().substring(0, 10) : ''}
                    onChange={(e) => setShuttleDate?.(new Date(e.target.value))}
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
                    value={shuttlePickUpTime}
                    onChange={(e) => setShuttlePickUpTime?.(e.target.value)}
                  />
                </div>
              </div>
            </div>


          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Passengers and Luggage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="text-blue-600 text-xl" />
                <div className="flex-1 space-y-2">
                  <Label>Passengers</Label>
                  <Select value={shuttlePassengers?.toString()} onValueChange={value =>
                    setShuttlePassengers?.(Number(value))
                  }>
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
                  <Select
                    value={shuttleLuggage?.toString()}
                    onValueChange={value => setShuttleLuggage?.(Number(value))}
                  >
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
                  value={shuttleSpecialRequests}
                  onChange={(e) => setShuttleSpecialRequests?.(e.target.value)}
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
                    <span className="text-muted-foreground">{shuttleCompany}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Passengers:</span>
                    <span className="text-muted-foreground">{shuttlePassengers}</span>
                  </div>
                  {(shuttleLuggage ?? 0) > 2 && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Extra Luggage:</span>
                      <span className="text-muted-foreground">
                        R{((shuttleLuggage ?? 0) - 2) * 25}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg flex items-center gap-1">
                      <CreditCard className="text-green-600" />
                      Total Price:
                    </span>
                    <span className="text-xl font-bold text-green-600">R{shuttleTotalPrice}</span>
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
