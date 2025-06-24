import { useEffect, useState } from 'react';
import { Plane, CreditCard, ArrowRightLeft, } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRequests } from '@/states/useRequests';

const FlightBookingCard = () => {
  // const [tripType, setTripType] = useState('round-trip');
  // const [departureCity, setDepartureCity] = useState('Cape Town (CPT)');
  // const [arrivalCity, setArrivalCity] = useState('Johannesburg (JNB)');
  // const [departureDate, setDepartureDate] = useState('');
  // const [returnDate, setReturnDate] = useState('');
  // const [departureTime, setDepartureTime] = useState('morning');
  // const [returnTime, setReturnTime] = useState('evening');
  // const [adults, setAdults] = useState('1');
  // const [children, setChildren] = useState('0');
  // const [infants, setInfants] = useState('0');
  // const [classType, setClassType] = useState('Economy');
  // const [luggage, setLuggage] = useState('1');
  // const [contactEmail, setContactEmail] = useState('');
  // const [contactNumber, setContactNumber] = useState('');
  // const [specialRequests, setSpecialRequests] = useState('');

  const { flightAdultPassengers, flightCheckedBags, flightDepartureCity, flightReturnCity, flightCompany, flightEstimatedTotalPrice, setFlightEstimatedTotalPrice,
    flightChildPassengers, flightClass, flightDepartureDate, flightDepartureTimePreference, flightInfantPassengers,
    flightReturnDate, flightReturnTimePreference, flightSpecialRequests, flightTripType, setFlightAdultPassengers, setFlightDepartureCity, setFlightReturnCity, setFlightCompany,
    setFlightCheckedBags, setFlightChildPassengers, setFlightClass, setFlightDepartureDate, setFlightDepartureTimePreference,
    setFlightInfantPassengers, setFlightReturnDate, setFlightReturnTimePreference, setFlightSpecialRequests, setFlightTripType
  } = useRequests();

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


  useEffect(() => {
    const basePrice =
      flightClass === 'Business'
        ? 2500
        : flightClass === 'Premium Economy'
          ? 1800
          : 1200;

    const totalPassengers =
      (flightAdultPassengers || 0) +
      (flightChildPassengers || 0) +
      ((flightInfantPassengers || 0) * 0.1); // likely you meant infants are 10% of price

    const tripMultiplier = flightTripType === 'round-trip' ? 2 : 1;
    const luggageExtra = (flightCheckedBags || 0) > 1 ? ((flightCheckedBags || 0) - 1) * 350 : 0;

    const result = Math.round((basePrice * totalPassengers * tripMultiplier) + luggageExtra);

    setFlightEstimatedTotalPrice(result);
  }, [
    flightClass,
    flightAdultPassengers,
    flightChildPassengers,
    flightInfantPassengers,
    flightTripType,
    flightCheckedBags,
    setFlightEstimatedTotalPrice,
  ]);

  const swapCities = () => {
    const temp = flightDepartureCity || ''; // Provide a fallback value
    if (setFlightDepartureCity) {
      setFlightDepartureCity(flightReturnCity || ''); // Provide a fallback value
    }
    if (setFlightReturnCity) {
      setFlightReturnCity(temp);
    }
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
            <RadioGroup
              value={flightTripType}
              onValueChange={(value: "one-way" | "multi-city" | "round-trip") => setFlightTripType ? setFlightTripType(value) : undefined}
              className="flex gap-6">
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
                    <Select value={flightDepartureCity}
                      onValueChange={(value: string) => setFlightDepartureCity ? setFlightDepartureCity(value) : undefined
                      }>
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
                    <Select value={flightReturnCity}
                      onValueChange={
                        (value: string) => setFlightReturnCity ? setFlightReturnCity(value) : undefined
                      }>
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
                    value={flightDepartureDate ? flightDepartureDate.toISOString().split('T')[0] : ''} // Convert Date to string for input
                    onChange={(e) => setFlightDepartureDate ? setFlightDepartureDate(new Date(e.target.value)) : undefined}
                  />
                </div>

                {flightTripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label htmlFor="return-date">Return Date</Label>
                    <Input
                      id="return-date"
                      type="date"
                      value={flightReturnDate ? flightReturnDate.toISOString().split('T')[0] : ''} // Convert Date to string for input
                      onChange={(e) => setFlightReturnDate ? setFlightReturnDate(new Date(e.target.value)) : undefined}
                    />
                  </div>
                )}
              </div>

              {/* Preferred Times */}
              <div className="flex gap-4 flex-wrap">
                <div className="space-y-2">
                  <Label>Departure Time Preference</Label>
                  <Select value={flightDepartureTimePreference} onValueChange={
                    (value: string) => setFlightDepartureTimePreference ? setFlightDepartureTimePreference(value as 'morning' | 'afternoon' | 'evening' | 'flexible') : undefined
                  }>
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

                {flightTripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label>Return Time Preference</Label>
                    <Select value={flightReturnTimePreference} onValueChange={
                      (value: "flexible" | "morning" | "afternoon" | "evening" | "early-morning") => setFlightReturnTimePreference ? setFlightReturnTimePreference(value as 'morning' | 'afternoon' | 'evening' | 'flexible') : undefined
                    }>
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
              {/* <div className="space-y-4">
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
              </div> */}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Passengers */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Passengers</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Adults (12+)</Label>
                    <Select value={flightAdultPassengers?.toString()} onValueChange={
                      (value: string) => setFlightAdultPassengers ? setFlightAdultPassengers(parseInt(value)) : undefined
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

                  <div className="space-y-2">
                    <Label>Children (2-11)</Label>
                    <Select value={flightChildPassengers?.toString()} onValueChange={
                      (value: string) => setFlightChildPassengers ? setFlightChildPassengers(parseInt(value)) : undefined
                    }>
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
                    <Select value={flightInfantPassengers?.toString()} onValueChange={
                      (value: string) => setFlightInfantPassengers ? setFlightInfantPassengers(parseInt(value)) : undefined
                    }>
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
                  <Select value={flightClass} onValueChange={
                    setFlightClass ? (value: string) => setFlightClass(value as 'Economy' | 'Premium Economy' | 'Business') : undefined
                  }>
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
                  <Select value={flightCheckedBags?.toString()} onValueChange={
                    (value: string) => setFlightCheckedBags ? setFlightCheckedBags(parseInt(value)) : undefined
                  }>
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
                  value={flightSpecialRequests}
                  onChange={(e) => setFlightSpecialRequests ? setFlightSpecialRequests(e.target.value) : undefined}
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
                      <span className="text-muted-foreground capitalize">{flightTripType?.replace('-', ' ') || 'Not Specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Class:</span>
                      <span className="text-muted-foreground">{flightClass}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Passengers:</span>
                      <span className="text-muted-foreground">
                        {flightAdultPassengers} Adult{flightAdultPassengers !== 1 ? 's' : ''}
                        {flightChildPassengers !== 0 && `, ${flightChildPassengers} Child${flightChildPassengers !== 1 ? 'ren' : ''}`}
                        {flightInfantPassengers !== 0 && `, ${flightInfantPassengers} Infant${flightInfantPassengers !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                    {(flightCheckedBags ?? 0) > 1 && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Extra Luggage:</span>
                        <span className="text-muted-foreground">R{((flightCheckedBags ?? 0) - 1) * 350}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg flex items-center gap-1">
                        <CreditCard className="text-green-600" />
                        Estimated Total:
                      </span>
                      <span className="text-xl font-bold text-green-600">R{flightEstimatedTotalPrice}</span>
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