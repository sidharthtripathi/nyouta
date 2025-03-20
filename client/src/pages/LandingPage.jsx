import flower from "../assets/images/flowers-1.jpg";
import valley from "../assets/images/valley.jpg";
import coupleImg from "../assets/images/couple.jpg";
import pigeonImg from "../assets/images/pigeons.png";
export default function LandingPage() {
  return (
    <main className="space-y-8">
      <section className="text-end flex w-full justify-between items-top h-72">
        <img src={flower} className="h-full min-w-fit" alt="flowers img" />
        <div>
          <div className=" border-b-2">
            <div className=" h-14 w-32 inline-flex justify-end items-star rounded-t-full">
              <img src={pigeonImg} className="w-2/3 min-w-fit" alt="pigeons" />
            </div>
            <p className="text-8xl uppercase">Wedding</p>
            <p className="text-2xl uppercase">Ceremony</p>
          </div>
          <div className=" border-b-2">
            <p className="text-5xl">Bride and Groom</p>
          </div>
          <div className="text-lg">
            <p >April 25th, 2025</p>
            <time>7:00PM</time>
          </div>
        </div>
      </section>
      <section className="flex justify-between items-center h-72 text-center">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-5xl">Save the Date</p>
            <p>April 25th 2025</p>
            <time>7:00PM</time>
          </div>
          <div>
            <p>Venue</p>
            <p>Venue name here</p>
          </div>
        </div>
        <div className="h-full flex items-center gap-4">
          <img src={coupleImg} className="h-1/2 min-w-fit" alt="couple img" />
          <p>
            Bride <br /> & <br /> Groom
          </p>
        </div>
        <img src={flower} className="h-full min-w-fit" alt="flower" />
      </section>
      <section className="flex h-72 justify-between text-center">
        <div className="grow">
          <h2>About us</h2>
          <p>
            HI THERE! WE’RE [YOUR NAME] & [PARTNER’S NAME], TWO SOULS WHO FOUND
            EACH OTHER AND HAVE BEEN BUILDING A LIFETIME OF LOVE EVER SINCE. OUR
            JOURNEY BEGAN [INSERT HOW/WHERE YOU MET], AND WHAT STARTED AS [A
            SPARK/A FRIENDSHIP/AN ADVENTURE] HAS GROWN INTO A DEEP AND ENDURING
            CONNECTION. TOGETHER, WE’VE SHARED LAUGHTER, CHALLENGES, DREAMS, AND
            COUNTLESS UNFORGETTABLE MOMENTS THAT HAVE BROUGHT US CLOSER EACH
            DAY. WE’RE SO EXCITED TO CELEBRATE THIS NEXT CHAPTER OF OUR LOVE
            STORY WITH THE PEOPLE WHO MEAN THE MOST TO US—OUR FAMILY AND
            FRIENDS. YOUR LOVE, SUPPORT, AND BLESSINGS HAVE SHAPED OUR LIVES IN
            MORE WAYS THAN WE CAN EXPRESS, AND HAVING YOU BY OUR SIDE AS WE SAY
            “I DO” MAKES THIS DAY EVEN MORE SPECIAL. THANK YOU FOR BEING PART OF
            OUR STORY. WE CAN’T WAIT TO SHARE THIS BEAUTIFUL MOMENT WITH YOU!
            WITH LOVE, [YOUR NAME] & [PARTNER’S NAME]
          </p>
        </div>
        <div className="flex h-full min-w-fit">
          <img
            src={valley}
            className="h-full w-60 object-cover rounded-t-full"
            alt="valley"
          />
          <img src={flower} className="h-full min-w-fit " alt="flower" />
        </div>
      </section>
      <section className="h-72 flex items-start text-center">
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <div className="grow">
          <h2>Our Story</h2>
          <p>
            IT ALL BEGAN [INSERT WHERE AND HOW YOU MET]. WHAT SEEMED LIKE [A
            CASUAL ENCOUNTER/DESTINY/A PERFECT COINCIDENCE] QUICKLY TURNED INTO
            SOMETHING UNFORGETTABLE. FROM THE VERY BEGINNING, WE KNEW THERE WAS
            SOMETHING SPECIAL ABOUT OUR CONNECTION.
          </p>
        </div>
      </section>
      <section className="flex h-72 text-center">
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <div className="grow">
          <h2>Wedding Programs</h2>
          {/* <WeddingProgram /> */}
          {
            weddingPrograms.map(({time,events,venueName})=>(
              <WeddingProgram time={time} events={events} venueName={venueName} />
            ))

          }
        </div>
      </section>
      <section className="h-72 flex justify-between items-start">
        <div>
          <h2>Event Name</h2>
          <p>Monday 21st april</p>
          <ul>
            <li>event 1</li>
            <li>event 1</li>
            <li>event 1</li>
          </ul>
          <div>icon</div>
          <div>
            <p>Venue</p>
            <p>Venue name here</p>
          </div>
        </div>
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <div>
          <h2>Event Name</h2>
          <p>Monday 21st april</p>
          <ul>
            <li>event 1</li>
            <li>event 1</li>
            <li>event 1</li>
          </ul>
          <div>icon</div>
          <div>
            <p>Venue</p>
            <p>Venue name here</p>
          </div>
        </div>
      </section>
      <section className="flex h-72 items-center justify-between">
        <img src={flower} className="h-full min-w-fit" alt="flower" />
        <p>
          Wedding <br /> Timeline
        </p>
        <div>{

          timelines.map(({time,events})=>(
            <Timeline time={time} events={events} />
          ))
          }</div>
      </section>
    </main>
  );
}

// events => {name,time}[]

const weddingPrograms = [
  { time: "sdfs", events: [{ name: "asdf", time: "asdf" },{ name: "asdf", time: "asdf" }], venueName: "asdf" },
  { time: "sdfs", events: [{ name: "asdf", time: "asdf" },{ name: "asdf", time: "asdf" }], venueName: "asdf" }
];

function WeddingProgram({ time, events, venueName }) {
  return (
    <div>
      <title>{time}</title>
      {events.map(({ name, time }) => (
        <p>
          {name},{time}
        </p>
      ))}
      <p>Venue Name {venueName}</p>
    </div>
  );
}

const timelines = [
  {time:"sdfa",events : [{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"}]},
  {time:"sdfa",events : [{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"}]},
  {time:"sdfa",events : [{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"},{time:"asdf",eventName : "asdf"}]}
]
// events => {name,time}[]
function Timeline({ time, events }) {
  return (
    <div>
      <div>{time}</div>
      {events.map(({ eventName, time }) => (
        <div>
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
