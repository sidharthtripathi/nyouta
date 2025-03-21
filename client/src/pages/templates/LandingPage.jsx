import flower from "../../assets/images/flowers-1.png";
import valley from "../../assets/images/valley.jpg";
import coupleImg from "../../assets/images/couple.png";
import pigeonImg from "../../assets/images/pigeons.png";
export default function LandingPage() {
  return (
    <main className="space-y-8">
      <section className="text-end flex-wrap flex w-full justify-between items-top pl-2 pr-12 py-3">
        <img src={flower} className="max-h-72 min-w-fit" alt="flowers img" />
        <div>
          <div className=" border-b-1 ">
            <div className=" h-14 w-32 inline-flex justify-end items-star rounded-t-full">
              <img src={pigeonImg} className="w-2/3 min-w-fit" alt="pigeons" />
            </div>
            <p className="text-8xl uppercase text-[#6384BF]">Wedding</p>
            <p className="text-2xl uppercase mb-2 text-[#6384BF]">Ceremony</p>
          </div>
          <div className=" border-b-1 ">
            <p className="text-5xl my-2 text-[#D24C6B]">Bride and Groom</p>
          </div>
          <div className="text-lg mt-2 text-[#D24C6B]">
            <p>April 25th, 2025</p>
            <time>7:00PM</time>
          </div>
        </div>
      </section>
      <section className="flex bg-[#E2EBF7] justify-between items-center text-center h-72 pr-4 py-3 pl-14">
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-5xl mb-2 text-[#D24C6B]">Save the Date</p>
            <p className="text-lg text-[#D24C6B]">April 25th 2025</p>
            <time className="text-lg text-[#D24C6B]">7:00PM</time>
          </div>
          <div className="text-lg text-[#D24C6B]">
            <p>Venue</p>
            <p>Venue name here</p>
          </div>
        </div>
        <div className="h-full flex items-center gap-4">
          <img src={coupleImg} className="h-1/2 min-w-fit" alt="couple img" />
          <p className="text-5xl leading-20 text-[#6384BF]">
            Bride <br /> & <br /> Groom
          </p>
        </div>
        <img src={flower} className="h-full min-w-fit" alt="flower" />
      </section>
      <section className="flex justify-between items-start py-3 text-center">
        <div className=" flex items-center">
          <div className="px-4">
            <h2 className="text-5xl mb-8 text-[#D24C6B]">About us</h2>
            <p className="text-sm">
              HI THERE! WE’RE [YOUR NAME] & [PARTNER’S NAME], TWO SOULS WHO
              FOUND EACH OTHER AND HAVE BEEN BUILDING A LIFETIME OF LOVE EVER
              SINCE. OUR JOURNEY BEGAN [INSERT HOW/WHERE YOU MET], AND WHAT
              STARTED AS [A SPARK/A FRIENDSHIP/AN ADVENTURE] HAS GROWN INTO A
              DEEP AND ENDURING CONNECTION. TOGETHER, WE’VE SHARED LAUGHTER,
              CHALLENGES, DREAMS, AND COUNTLESS UNFORGETTABLE MOMENTS THAT HAVE
              BROUGHT US CLOSER EACH DAY. WE’RE SO EXCITED TO CELEBRATE THIS
              NEXT CHAPTER OF OUR LOVE STORY WITH THE PEOPLE WHO MEAN THE MOST
              TO US—OUR FAMILY AND FRIENDS. YOUR LOVE, SUPPORT, AND BLESSINGS
              HAVE SHAPED OUR LIVES IN MORE WAYS THAN WE CAN EXPRESS, AND HAVING
              YOU BY OUR SIDE AS WE SAY “I DO” MAKES THIS DAY EVEN MORE SPECIAL.
              THANK YOU FOR BEING PART OF OUR STORY. WE CAN’T WAIT TO SHARE THIS
              BEAUTIFUL MOMENT WITH YOU! WITH LOVE, [YOUR NAME] & [PARTNER’S
              NAME]
            </p>
          </div>
        </div>
        <div className="flex h-full min-w-fit">
          <img
            src={valley}
            className="h-72 w-60 object-cover rounded-t-full"
            alt="valley"
          />
          <img src={flower} className="h-72 " alt="flower" />
        </div>
      </section>
      <section className="min-h-fit flex items-start text-center py-3">
        <img src={flower} className="h-72 min-w-fit" alt="flower" />
        <div className="grow text-center">
          <h2 className="text-5xl mb-4 text-[#D24C6B]">Our Story</h2>
          <p className="text-lg px-36">
            IT ALL BEGAN [INSERT WHERE AND HOW YOU MET]. WHAT SEEMED LIKE [A
            CASUAL ENCOUNTER/DESTINY/A PERFECT COINCIDENCE] QUICKLY TURNED INTO
            SOMETHING UNFORGETTABLE. FROM THE VERY BEGINNING, WE KNEW THERE WAS
            SOMETHING SPECIAL ABOUT OUR CONNECTION.
          </p>
        </div>
      </section>
      <section className="flex h-72 text-center bg-[#E2EBF7] py-3">
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <div className="grow">
          <h2 className="text-5xl mb-4 text-[#D24C6B] space-y-4">Wedding Programs</h2>
          {/* <WeddingProgram /> */}
          {weddingPrograms.map(({ time, events, venueName }) => (
            <WeddingProgram time={time} events={events} venueName={venueName} />
          ))}
        </div>
      </section>
      <section className="h-72 flex justify-between items-start py-3">
        <div className="text-center">
          <h2 className="text-5xl text-[#D24C6B]">Event Name</h2>
          <p className="text-xl text-[#D24C6B]">Monday 21st april</p>
          <ul>
            <li>EVENT-1 NAME - TIME</li>
            <li>EVENT-1 NAME - TIME</li>
            <li>EVENT-1 NAME- TIME</li>
          </ul>
          <div>icon</div>
          <div>
            <p className="text-sm text-[#D24C6B]">Venue</p>
            <p className="text-xl text-[#D24C6B]">Venue name here</p>
          </div>
        </div>
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <div className="text-center">
          <h2 className="text-5xl text-[#D24C6B]">Event Name</h2>
          <p className="text-xl text-[#D24C6B]">Monday 21st april</p>
          <ul>
            <li>EVENT-1 NAME - TIME</li>
            <li>EVENT-1 NAME - TIME</li>
            <li>EVENT-1 NAME- TIME</li>
          </ul>
          <div>icon</div>
          <div>
            <p className="text-sm text-[#D24C6B]">Venue</p>
            <p className="text-xl text-[#D24C6B]">Venue name here</p>
          </div>
        </div>
      </section>
      <section className="flex h-72 items-center justify-between py-3">
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <p className="text-5xl text-[#D24C6B] ">
          Wedding <br /> Timeline
        </p>
        <div>
          {timelines.map(({ time, events }) => (
            <Timeline time={time} events={events} />
          ))}
        </div>
      </section>
    </main>
  );
}

// events => {name,time}[]

const weddingPrograms = [
  {
    time: "MONDAY, 2XST APRIL, 2025",
    events: [
      { name: "EVENT-1 NAME", time: "TIME" },
      { name: "EVENT-2 NAME", time: "TIME" },
    ],
    venueName: "VENUE : VENUE NAME HERE",
  },
  {
    time: "MONDAY, 2XND APRIL, 2025",
    events: [
      { name: "EVENT-1 NAME", time: "TIME" },
      { name: "EVENT-2 NAME", time: "TIME" },
    ],
    venueName: "VENUE : VENUE NAME HERE",
  },
];

function WeddingProgram({ time, events, venueName }) {
  return (
    <div className="text-lg mt-2">
      <p className="text-2xl text-[#D24C6B] mb-2">{time}</p>
      {events.map(({ name, time }) => (
        <p className="text-sm">
          {name},{time}
        </p>
      ))}
      <p className="text-[#D24C6B] mt-2">Venue Name {venueName}</p>
    </div>
  );
}

const timelines = [
  {
    time: "MONDAY, 2XST APRIL, 2025",
    events: [
      { time: "EVENT NAME 1", eventName: "00.00 AM/P" },
      { time: "EVENT NAME 2", eventName: "00.00 AM/P," },
      { time: "EVENT NAME 3", eventName: "00.00 AM/P," },
    ],
  },
  {
    time: "TUESDAY, 2XST APRIL, 2025",
    events: [
      { time: "EVENT NAME 1", eventName: "00.00 AM/P" },
      { time: "EVENT NAME 2", eventName: "00.00 AM/P," },
      { time: "EVENT NAME 3", eventName: "00.00 AM/P," },
    ],
  },
  {
    time: "WEDNESDAY, 2XST APRIL, 2025",
    events: [
      { time: "EVENT NAME 1", eventName: "00.00 AM/P" },
      { time: "EVENT NAME 2", eventName: "00.00 AM/P," },
      { time: "EVENT NAME 3", eventName: "00.00 AM/P," },
    ],
  },
];
// events => {name,time}[]
function Timeline({ time, events }) {
  return (
    <div>
      <div className="text-xl mt-2 text-[#D24C6B]">{time}</div>
      {events.map(({ eventName, time }) => (
        <div className="text-sm">
          {eventName},{time}
        </div>
      ))}
    </div>
  );
}

// export default function LandingPage(){
//   return (
//     <img src="" alt="" />
//   )
// }
