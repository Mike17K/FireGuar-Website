import React, { useEffect } from "react";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    function handleBackgoundMovement() {
      let y = window.scrollY;
      let bgImages = document.querySelectorAll("#background-imgs img");
      bgImages.forEach((bgImg) => {
        let yOffset = parseInt(bgImg.getAttribute("yoffset"));
        let speed = parseFloat(bgImg.getAttribute("speed"));
        bgImg.style.top = Math.floor(speed * y) + yOffset + "px";
      });
    }
    document.addEventListener("scroll", handleBackgoundMovement);
    return () => {
      document.removeEventListener("scroll", handleBackgoundMovement);
    };
  }, []);

  return (
    <div className="relative w-[1440px]">
      <div id="background-imgs" className="absolute top-0 left-0 w-full">
        <img
          src="images/wallpaper2.jpg"
          alt=""
          className="w-full absolute top-0 left-0 -z-10"
          yoffset="0"
          speed="0.7"
        />
        <img
          src="images/wallpaper3.png"
          alt=""
          className="w-full absolute top-0 left-0 z-0"
          yoffset="1000"
          speed="0.7"
        />
        <img
          src="images/wallpaper2.jpg"
          alt=""
          className="w-full absolute top-0 left-0 -z-10"
          yoffset="800"
          speed="0.7"
        />
      </div>

      <div className="w-[1440px] h-[414px] left-0 top-[816px] absolute bg-black bg-opacity-100" />
      <div className="left-[123px] top-[1310px] absolute text-white text-6xl font-bold font-['Inter']">
        Our Vision
      </div>
      <div className="w-[1440px] h-[735px] left-0 top-[81px] absolute bg-neutral-800 bg-opacity-40" />
      <div className="left-[281px] top-[355px] absolute text-white text-8xl font-black font-['Inter']">
        FireGuard Systems
      </div>
      <div className="w-[1152px] left-[144px] top-[573px] absolute text-white text-3xl font-normal font-['Inter']">
        Dream big with our startup, as we revolutionize our precious forests
        with unique technology and unwavering passion. Keep scrolling to learn
        more about the extraordinary journey we're on, changing the landscape
        for a sustainable future.
      </div>
      <div className="w-[1324px] h-[325px] left-[84px] top-[869px] absolute text-white text-[50px] font-bold font-['Inter']">
        Our solutions have implemented in 15 forests across Europe, covering
        over a million square kilometers of land in the past three years. Our
        efforts have successfully prevented about 10+ fire incidents each year!
      </div>
      <img
        className="w-[1440px] h-[3140px] left-0 top-[1806px] absolute"
        src="https://via.placeholder.com/1440x3140"
      />
      <img
        className="w-[1440px] h-[3228px] left-0 top-[4946px] absolute"
        src="https://via.placeholder.com/1440x3228"
      />
      <div className="w-[1262px] h-[944px] left-[108px] top-[1440px] absolute bg-orange-200 bg-opacity-80" />
      <div className="w-[1262px] h-[1764px] left-[108px] top-[4994px] absolute bg-orange-200 bg-opacity-80" />
      <div className="w-[1440px] h-[960px] left-0 top-[7214px] absolute bg-orange-200 bg-opacity-80" />
      <div className="w-[1262px] h-[2101px] left-[113px] top-[2607px] absolute bg-orange-200 bg-opacity-80" />
      <div className="w-[1090px] h-[220px] left-[194px] top-[2694px] absolute text-neutral-600 text-[34px] font-bold font-['Inter']">
        Our groundbreaking solution stands apart through a harmonious blend of
        human interaction and cutting-edge technology. At the core, we leverage
        human observers to make the final confirmation of fire alarms, turning
        their expertise into a pivotal element of our system.
      </div>
      <div className="w-[1090px] h-[222px] left-[194px] top-[3923px] absolute text-neutral-600 text-[34px] font-bold font-['Inter']">
        Adding a layer of visual acuity, strategically positioned live cameras
        meticulously monitor the forest during the perilous summer months. This
        precision allows us to swiftly identify the center of potential fire
        outbreaks. For our inspection teams, we offer a user-friendly system
        granting live video access, providing real-time insights and enhancing
        their ability to respond effectively.
        <br />
      </div>
      <div className="w-[1090px] h-[142px] left-[194px] top-[4490px] absolute text-neutral-600 text-[34px] font-bold font-['Inter']">
        In essence, our solution is not just about technology, it's a symphony
        of human expertise and artificial intelligence working together
        seamlessly to safeguard our forests.
      </div>
      <div className="w-[1090px] h-[246px] left-[194px] top-[3258px] absolute text-neutral-600 text-[34px] font-bold font-['Inter']">
        In the heart of the forest, our IoT sensors diligently measure CO2
        levels, temperature, and humidity. These real-time data are seamlessly
        transmitted by our gateways to our servers. Here, a symphony of AI
        models and smart data structures processes the information, enabling
        swift and accurate responses.
      </div>
      <div className="w-[1114px] left-[192px] top-[1518px] absolute">
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          At FireGuard Systems, our vision transcends the ordinary, it is a
          profound commitment to redefine the relationship between{" "}
        </span>
        <span className="text-blue-500 text-[34px] font-bold font-['Inter']">
          technology
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          {" "}
          and{" "}
        </span>
        <span className="text-green-700 text-[34px] font-bold font-['Inter']">
          nature
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          . We envision a world where innovation becomes the guardian of our
          forests, where the delicate balance between ecosystems and progress is
          not just maintained but elevated.
          <br />
          <br />
          In our pursuit, we see a tapestry of 15 forests across Europe, each
          intricately woven with our transformative solutions, covering over a
          million square kilometers of land. Our vision extends beyond the mere
          prevention of 12 fire incidents annually, it encompasses the
          preservation of biodiversity, the sustainability of ecosystems, and
          the creation of a legacy that resonates through generations.
          <br />
          <br />
          We strive to be{" "}
        </span>
        <span className="text-red-600 text-[34px] font-bold font-['Inter']">
          architects of change
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          , harnessing the power of cutting-edge technology to protect the heart
          of our planet. As we forge ahead, our vision is one where every rustle
          of leaves in these enchanted forests whispers gratitude for the
          vigilance we've provided.
        </span>
      </div>
      <div className="left-[113px] top-[2416px] absolute text-white text-6xl font-bold font-['Inter']">
        Our Solution
      </div>
      <img
        className="w-[458px] h-[244px] left-[214px] top-[2964px] absolute"
        src="https://via.placeholder.com/458x244"
      />
      <img
        className="w-[516px] h-[322px] left-[774px] top-[3514px] absolute"
        src="https://via.placeholder.com/516x322"
      />
      <img
        className="w-[518px] h-56 left-[485px] top-[4218px] absolute"
        src="https://via.placeholder.com/518x224"
      />
      <div className="left-[113px] top-[4812px] absolute text-white text-6xl font-bold font-['Inter']">
        Impact
      </div>
      <div className="left-[409px] top-[7283px] absolute text-white text-6xl font-bold font-['Inter']">
        Connect With Us
      </div>
      <div className="w-[1134px] left-[178px] top-[5048px] absolute">
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Our journey is defined by the transformative impact we've achieved in
          just three years. Here's a snapshot of how we're changing the
          narrative for our forests and beyond
          <br />
          <br />
          1. Extensive Coverage:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Our solution spans 15 key forests across Europe, covering over a
          million square kilometers of precious land. Each deployment is a
          testament to our commitment to safeguarding the natural world.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          2. Human-Centric Vigilance:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Engaging human observers as the final arbiters of fire alarms not only
          enhances the accuracy of our system but also fosters a collaborative
          approach to forest protection.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          3. Real-Time Insights:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          IoT sensors embedded in the heart of the forest measure critical
          parameters—CO2 levels, temperature, and humidity. This real-time data
          forms the foundation of our proactive strategy.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          4. AI-Powered Precision:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Behind the scenes, our servers come alive with advanced AI models and
          smart data structures. This dynamic duo processes incoming data,
          enabling timely and informed decision-making.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          5. Visual Sentinel:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Strategically placed live cameras act as vigilant eyes during the
          vulnerable summer months. Their precision is our first line of
          defense, swiftly identifying potential fire centers.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          6. Team Empowerment:
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          Our intuitive system provides live video access to inspection teams,
          empowering them with real-time insights. This not only enhances their
          capabilities but also facilitates agile and informed decision-making.
          <br />
        </span>
        <span className="text-neutral-600 text-[34px] font-bold font-['Inter']">
          <br />
          Our impact is tangible: 12 fire incidents prevented annually. This is
          more than a statistic; it's a testament to our commitment to a
          sustainable future. As we forge ahead, the echoes of our efforts
          resonate through the forests we protect, leaving an enduring legacy of
          environmental stewardship.
        </span>
      </div>
      <div className="w-[1252px] h-[232px] left-[94px] top-[6865px] absolute bg-zinc-300" />
      <div className="left-[161px] top-[6944px] absolute text-white text-6xl font-bold font-['Inter']">
        Sign Up to our newsletter
      </div>
      <div className="w-[250px] h-[104px] left-[1028px] top-[6929px] absolute bg-green-400 rounded-[49px] border-4 border-white" />
      <div className="left-[1087px] top-[6944px] absolute text-white text-6xl font-bold font-['Inter']">
        here
      </div>
      <img
        className="w-[115px] h-[115px] left-[895px] top-[7401px] absolute"
        src="https://via.placeholder.com/115x115"
      />
      <img
        className="w-[115px] h-[115px] left-[1063px] top-[7401px] absolute"
        src="https://via.placeholder.com/115x115"
      />
      <div className="w-[1264px] h-[354px] left-[94px] top-[7756px] absolute bg-orange-100 rounded-[28px]" />
      <div className="w-[453px] h-[72px] left-[94px] top-[7658px] absolute bg-orange-100 rounded-[14px]" />
      <div className="w-[218px] h-[72px] left-[1128px] top-[7658px] absolute bg-green-400 rounded-[14px] border-4 border-white" />
      <div className="left-[94px] top-[7562px] absolute text-neutral-500 text-6xl font-bold font-['Inter']">
        Sent us a message with Gmail
      </div>
      <div className="left-[122px] top-[7674px] absolute text-neutral-400 text-opacity-60 text-[32px] font-bold font-['Inter']">
        Full Name
      </div>
      <div className="left-[122px] top-[7786px] absolute text-neutral-400 text-opacity-60 text-[32px] font-bold font-['Inter']">
        Your message
      </div>
      <div className="left-[1180px] top-[7663px] absolute text-white text-[50px] font-bold font-['Inter']">
        Sent
      </div>
      <img
        className="w-[115px] h-[115px] left-[1231px] top-[7401px] absolute"
        src="https://via.placeholder.com/115x115"
      />
      <div className="left-[108px] top-[7430px] absolute text-neutral-500 text-3xl font-bold font-['Inter']">
        Address Ρίμινι 1, Χαϊδάρι 124 62
        <br />
        Phone Number: 269 1002 012, +30 6922448315
      </div>
      <div className="w-[1440px] h-[168px] left-0 top-[8174px] absolute bg-black" />
      <div className="w-[54px] h-[54px] left-[418px] top-[8234px] absolute">
        <img
          className="w-[54px] h-[54px] left-0 top-0 absolute"
          src="https://via.placeholder.com/54x54"
        />
        <img
          className="w-[32.91px] h-[32.91px] left-[21.09px] top-[5.91px] absolute"
          src="https://via.placeholder.com/33x33"
        />
      </div>
      <div className="w-[541px] left-[481px] top-[8249px] absolute text-white text-xl font-bold font-['Inter']">
        © 2023 FireGuard Systems, Inc. Terms Privacy Contact
      </div>
      <img
        className="w-[450px] h-[300px] left-[780px] top-[2909px] absolute"
        src="https://via.placeholder.com/450x300"
      />
      <img
        className="w-[536px] h-[321px] left-[194px] top-[3514px] absolute"
        src="https://via.placeholder.com/536x321"
      />
    </div>
  );
}
