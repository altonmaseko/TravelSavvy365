
import { useHeader } from "../../states/useHeader";
import { useEffect } from "react";
import RequestReviewUberCard from "./RequestReviewUberCard";
import RequestReviewFlightCard from "./RequestReviewFlightCard";
import RequestReviewShuttleCard from "./RequestReviewShuttleCard";
import RequestReviewRentalCard from "./RequestReviewRentalCard";

const LineManagerHome = () => {

  // const { blackBrown, mainBlue } = useThemeStore();

  const { setWorkerName, setWorkerType } = useHeader();

  useEffect(() => {
    setWorkerName("Alton Maseko")
    setWorkerType("Line Manager")
  }, [])



  return (
    <div className=" min-h-screen flex flex-col items-start gap-1  ">


      <main className="flex flex-col w-full gap-4 p-2">

        <div className="flex flex-row gap-4 w-full items-center">
          <h3>Filter By: </h3>
          <div className="flex grow gap-4">
            {/* Employee */}
            <select className="border-2 border-black rounded-lg p-2">
              <option value="all">Employee</option>
              <option value="john">John</option>
              <option value="sarah">Sarah</option>
              <option value="michael">Michael</option>
              <option value="emily">Emily</option>
              <option value="david">David</option>
              <option value="sophie">Sophie</option>
              <option value="daniel">Daniel</option>
              <option value="olivia">Olivia</option>
              <option value="james">James</option>
              <option value="sophia">Sophia</option>
              <option value="ethan">Ethan</option>
              <option value="ava">Ava</option>
              <option value="lucas">Lucas</option>
              <option value="isabella">Isabella</option>
              <option value="benjamin">Benjamin</option>
              <option value="mia">Mia</option>
              <option value="william">William</option>
              <option value="grace">Grace</option>
              <option value="alexander">Alexander</option>
            </select>

            {/* Travel Type */}
            <select className="border-2 border-black rounded-lg p-2">
              <option value="date">Travel Type</option>
              <option value="economy">Economy</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="van">Van</option>
            </select>

            {/* Date */}
            <div className="flex flex-col gap-2 ">
              <input
                type="date"
                className="border-2 border-black rounded-lg p-2"
              />
            </div>

          </div>
        </div>



        <section className="flex flex-row flex-wrap gap-4">
          <RequestReviewUberCard request={{
            id: 'abc123',
            employeeName: 'Alton Maseko',
            uberPickUpLocation: 'Rosebank Mall',
            uberDropOffLocation: 'Wits Education Campus',
            uberPickUpTime: '18:00',
            uberRideType: 'Premium',
            uberDate: new Date(),
            uberNotes: 'Attending a conference.',
            uberEstimatedPrice: 280,
            requestDate: new Date(),
          }} />

          <RequestReviewFlightCard request={{
            id: 'flight-002',
            employeeName: 'Zanele Nkosi',
            flightCompany: 'lift',
            flightTripType: 'round-trip',
            flightDepartureDate: new Date('2025-02-10'),
            flightDepartureCity: 'Cape Town',
            flightReturnCity: 'Johannesburg',
            flightReturnDate: new Date('2025-02-14'),
            flightDepartureTimePreference: 'afternoon',
            flightReturnTimePreference: 'morning',
            flightAdultPassengers: 2,
            flightChildPassengers: 1,
            flightInfantPassengers: 0,
            flightClass: 'Business',
            flightCheckedBags: 3,
            flightSpecialRequests: 'Prefer window seats for all passengers.',
            flightEstimatedTotalPrice: 6200,
            requestDate: new Date('2025-01-10'),
          }} />

          <RequestReviewShuttleCard
            request={{
              id: 'sh-002',
              employeeName: 'Thabo Mokoena',
              shuttleCompany: 'greyhound',
              shuttleDate: new Date('2025-01-05'),
              shuttlePickUpTime: '10:00',
              shuttlePickUpLocation: 'Pretoria',
              shuttleDropOffLocation: 'Bloemfontein',
              shuttlePassengers: 1,
              shuttleLuggage: 2,
              shuttleSpecialRequests: 'Quiet seat preferred',
              shuttleTotalPrice: 450,
              requestDate: new Date('2024-12-20'),
            }}
            onApprove={(id) => console.log('Approved:', id)}
            onReject={(id, reason) => console.log('Rejected:', id, reason)}
            onRequestInfo={(id, info) => console.log('Info Requested:', id, info)}
          />


          <RequestReviewRentalCard
            request={{
              id: 'rental-123',
              employeeName: 'Sibongile Nkosi',
              rentalCompany: 'hertz',
              rentalPickUpDate: new Date('2025-01-02'),
              rentalReturnDate: new Date('2025-01-08'),
              rentalPickUpLocation: 'OR Tambo International Airport',
              rentalCarType: 'SUV',
              rentalEstimatedPrice: 1700,
              requestDate: new Date('2024-12-30'),
            }}
            onApprove={(id) => console.log('Approved rental:', id)}
            onReject={(id, reason) => console.log('Rejected rental:', id, reason)}
            onRequestInfo={(id, info) => console.log('Requested rental info:', id, info)}
          />
        </section>


      </main>


    </div>
  )
}

export default LineManagerHome