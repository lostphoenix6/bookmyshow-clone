"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// This would normally come from an API
const getMovie = (id: string) => {
  const movies = {
    "1": {
      id: 1,
      title: "Sikandar",
      poster: "/sikander.jpg?height=600&width=400", // Updated image path
      banner: "/sikander.jpg?height=400&width=1200",
      genres: ["Action", "Drama"],
      likes: 87,
      rating: 4.2,
      duration: "2h 30m",
      language: "Hindi",
      releaseDate: "April 15, 2024",
    },
    "2": {
      id: 2,
      title: "A Minecraft Movie",
      poster: "/minecraft.jpg?height=600&width=400", // Updated image path
      banner: "/placeholder.svg?height=400&width=1200",
      genres: ["Action", "Animation", "Comedy"],
      likes: 92,
      rating: 4.5,
      duration: "1h 45m",
      language: "English",
      releaseDate: "April 20, 2024",
    },
  }

  return movies[id as keyof typeof movies]
}

const theaters = [
  { id: 1, name: "PVR Cinemas - Phoenix Mall", location: "Lower Parel, Mumbai" },
  { id: 2, name: "INOX Cinemas - R City Mall", location: "Ghatkopar, Mumbai" },
  { id: 3, name: "Cinepolis - Viviana Mall", location: "Thane, Mumbai" },
]

const showtimes = [
  { id: 1, time: "10:30 AM", price: "₹180" },
  { id: 2, time: "1:15 PM", price: "₹220" },
  { id: 3, time: "4:30 PM", price: "₹250" },
  { id: 4, time: "7:45 PM", price: "₹280" },
  { id: 5, time: "10:30 PM", price: "₹300" },
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const movie = getMovie(params.id)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null)
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null)
  const [ticketCount, setTicketCount] = useState(2)

  if (!movie) {
    return <div className="container mx-auto px-4 py-12">Movie not found</div>
  }

  const handleContinue = () => {
    if (step === 1 && selectedDate && selectedTheater && selectedShowtime) {
      setStep(2)
    } else if (step === 2) {
      router.push(
        `/movies/${params.id}/book/seats?theater=${selectedTheater}&showtime=${selectedShowtime}&tickets=${ticketCount}`,
      )
    }
  }

  const dates = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/">
            <Image src="/bookmyshow-logo.png" alt="BookMyShow" width={140} height={40} className="h-10 w-auto" />
          </Link>

          <Link href="/sign-in">
            <Button variant="destructive" size="sm" className="rounded-md">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/movies/${params.id}`} className="text-gray-500 hover:text-gray-700">
            {movie.title}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Book Tickets</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              width={80}
              height={120}
              className="w-20 h-auto rounded-md"
            />
            <div>
              <h1 className="text-2xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-sm text-gray-600">{movie.language}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{movie.duration}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{movie.genres.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-semibold">
              {step === 1 ? "Select Date, Theater & Showtime" : "How many tickets?"}
            </h2>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-red-500" : "bg-gray-300"}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-red-500" : "bg-gray-300"}`}></div>
              <div className={`w-3 h-3 rounded-full bg-gray-300`}></div>
            </div>
          </div>

          {step === 1 ? (
            <>
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Date</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {dates.map((date, index) => (
                    <Button
                      key={index}
                      variant={date.toDateString() === selectedDate?.toDateString() ? "default" : "outline"}
                      className="flex flex-col h-auto py-2"
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className="text-xs">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                      <span className="text-lg font-semibold">{date.getDate()}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Theater</h3>
                <div className="space-y-3">
                  {theaters.map((theater) => (
                    <div
                      key={theater.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedTheater === theater.id ? "border-red-500 bg-red-50" : "hover:border-gray-400"}`}
                      onClick={() => setSelectedTheater(theater.id)}
                    >
                      <h4 className="font-medium">{theater.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{theater.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Showtime</h3>
                <div className="flex flex-wrap gap-3">
                  {showtimes.map((showtime) => (
                    <Button
                      key={showtime.id}
                      variant={selectedShowtime === showtime.id ? "default" : "outline"}
                      className={
                        selectedShowtime === showtime.id ? "" : "border-green-500 text-green-600 hover:bg-green-50"
                      }
                      onClick={() => setSelectedShowtime(showtime.id)}
                    >
                      <div className="flex flex-col items-center">
                        <span>{showtime.time}</span>
                        <span className="text-xs">{showtime.price}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="py-8">
              <h3 className="font-medium mb-6 text-center">How many tickets would you like?</h3>
              <div className="flex justify-center items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}>
                  -
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{ticketCount}</span>
                <Button variant="outline" size="icon" onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}>
                  +
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={step === 1 && (!selectedDate || !selectedTheater || !selectedShowtime)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

