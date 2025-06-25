
import { useHeader } from "../../states/useHeader";
import { useEffect } from "react";
import RequestReviewUberCard, { UberRequestData } from "./RequestReviewUberCard";
import RequestReviewFlightCard, { FlightRequestData } from "./RequestReviewFlightCard";
import RequestReviewShuttleCard, { ShuttleRequestData } from "./RequestReviewShuttleCard";
import RequestReviewRentalCard, { RentalRequestData } from "./RequestReviewRentalCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const LineManagerHome = () => {

  // const { blackBrown, mainBlue } = useThemeStore();

  const { setWorkerName, setWorkerType } = useHeader();

  useEffect(() => {
    setWorkerName("Alton Maseko")
    setWorkerType("Line Manager")
  }, [])


  const mockUberRequests: UberRequestData[] = [
    {
      id: "uber-001",
      employeeName: "John Doe",
      uberPickUpLocation: "Wits Main Campus",
      uberDropOffLocation: "OR Tambo",
      uberPickUpTime: "09:00",
      uberRideType: "Premium",
      uberDate: new Date("2025-01-02"),
      uberEstimatedPrice: 420,
      uberNotes: "Travelling for external stakeholder meeting",
    },
  ];

  const mockFlightRequests: FlightRequestData[] = [
    {
      id: "flight-001",
      employeeName: "Lerato Mokoena",
      flightCompany: "airlink",
      flightTripType: "round-trip",
      flightDepartureDate: new Date("2025-01-10"),
      flightDepartureCity: "Cape Town",
      flightReturnCity: "Durban",
      flightReturnDate: new Date("2025-01-14"),
      flightClass: "Business",
      flightEstimatedTotalPrice: 5500,
    },
  ];

  const mockShuttleRequests: ShuttleRequestData[] = [
    {
      id: "shuttle-001",
      employeeName: "Sipho Nkosi",
      shuttleCompany: "citiliner",
      shuttleDate: new Date("2025-02-01"),
      shuttlePickUpLocation: "Pretoria",
      shuttleDropOffLocation: "Gqeberha",
      shuttlePickUpTime: "06:00",
      shuttlePassengers: 1,
      shuttleLuggage: 1,
      shuttleTotalPrice: 670,
    },
  ];

  const mockRentalRequests: RentalRequestData[] = [
    {
      id: "rental-001",
      employeeName: "Zanele Dlamini",
      rentalCompany: "avis",
      rentalPickUpDate: new Date("2025-01-05"),
      rentalReturnDate: new Date("2025-01-10"),
      rentalPickUpLocation: "Sandton City",
      rentalCarType: "SUV",
      rentalEstimatedPrice: 3100,
    },
  ];



  return (
    <div className=" min-h-screen flex flex-col items-start gap-1  ">


      <main className="flex flex-col w-full gap-4 p-2">





        <section className="flex flex-row flex-wrap gap-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 w-full gap-2">
              {["all", "uber", "flight", "shuttle", "rental"].map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className={clsx(
                    "border border-gray-300 rounded-md px-4 py-2 text-sm font-medium transition-all",
                    "bg-transparent data-[state=active]:bg-blue-100 data-[state=active]:border-blue-500"
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All Requests */}
            <TabsContent value="all" className="mt-4 space-y-4 flex flex-wrap gap-4">
              {mockUberRequests.map((req) => (
                <RequestReviewUberCard key={req.id} request={req} />
              ))}
              {mockFlightRequests.map((req) => (
                <RequestReviewFlightCard key={req.id} request={req} />
              ))}
              {mockShuttleRequests.map((req) => (
                <RequestReviewShuttleCard key={req.id} request={req} />
              ))}
              {mockRentalRequests.map((req) => (
                <RequestReviewRentalCard key={req.id} request={req} />
              ))}
            </TabsContent>

            <TabsContent value="uber" className="mt-4 space-y-4 flex flex-wrap gap-4">
              {mockUberRequests.map((req) => (
                <RequestReviewUberCard key={req.id} request={req} />
              ))}
            </TabsContent>

            <TabsContent value="flight" className="mt-4 space-y-4 flex flex-wrap gap-4">
              {mockFlightRequests.map((req) => (
                <RequestReviewFlightCard key={req.id} request={req} />
              ))}
            </TabsContent>

            <TabsContent value="shuttle" className="mt-4 space-y-4 flex flex-wrap gap-4">
              {mockShuttleRequests.map((req) => (
                <RequestReviewShuttleCard key={req.id} request={req} />
              ))}
            </TabsContent>

            <TabsContent value="rental" className="mt-4 space-y-4 flex flex-wrap gap-4">
              {mockRentalRequests.map((req) => (
                <RequestReviewRentalCard key={req.id} request={req} />
              ))}
            </TabsContent>
          </Tabs>
        </section>


      </main>


    </div>
  )
}

export default LineManagerHome