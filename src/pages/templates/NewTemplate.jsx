import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { PencilIcon } from "lucide-react";
import image1 from "../../assets/template/new.png";
import image2 from "../../assets/template/img25.jpg";
import image3 from "../../assets/template/img37.jpg";
import logo from "../../assets/template/img80.jpg";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import TemplatePricing from "../../components/TemplatePricing";

const TextBlock = ({ label, value, onChange, style, onStyleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textStyle, setTextStyle] = useState(style);

  const handleStyleChange = (key, val) => {
    const newStyle = { ...textStyle, [key]: val };
    setTextStyle(newStyle);
    onStyleChange(newStyle);
  };

  return (
    <div className="relative group inline-block mt-2">
      <p className="text-lg font-templateBody text-blue-400 " style={textStyle}>
        {value}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-1 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <PencilIcon className="w-5 h-5 text-gray-600" />
      </button>
      {/* Editing Drawer */}
      <div
        className={`fixed z-[100] left-0 top-0 text-black h-full w-64 bg-white shadow-lg p-5 transition-transform duration-300 ${
          isEditing ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Edit {label}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm p-2 border rounded mb-3"
        />
        <div className="mb-3">
          <label className="block text-sm font-semibold">Font Size</label>
          <input
            type="number"
            value={textStyle.fontSize.replace("px", "")}
            onChange={(e) =>
              handleStyleChange("fontSize", e.target.value + "px")
            }
            className="w-full text-sm p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-semibold">Font Family</label>
          <select
            onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
            className="w-full text-sm p-2 border rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Cursive">Cursive</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() =>
              handleStyleChange(
                "fontWeight",
                textStyle.fontWeight === "bold" ? "normal" : "bold"
              )
            }
            className="p-2 text-sm border rounded w-1/3"
          >
            B
          </button>
          <button
            onClick={() =>
              handleStyleChange(
                "fontStyle",
                textStyle.fontStyle === "italic" ? "normal" : "italic"
              )
            }
            className="p-2 text-sm border rounded w-1/3"
          >
            I
          </button>
        </div>
        <button
          onClick={() => setIsEditing(false)}
          className="mt-4 w-full bg-gray-800 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// color blue : #BEE3F8
const NewTemplate = () => {
  return (
    <div>
      <div>
        <TemplatePricing />
        <WeddingVenueCard />
        <RSVPComponent />
        <WeddingInvitation />
        <WeddingInvitationPage />
        <div className="nyouta w-full flex flex-col gap-10 items-center justify-center py-20">
          <h1 className="font-templateHeadings lg:text-5xl font-bold text-6xl text-blue-400">
            Creating Special for Special Day.
          </h1>
          <img className=" h-[100px] w-[200px]" src={logo} alt="" />
          <h2 className=" uppercase text-[#563B0E] font-bold text-5xl">
            Nyouta.com
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NewTemplate;

const WeddingInvitation = () => {
  const [names, setNames] = useState([
    "EDIT NAME HERE 1",
    "EDIT NAME HERE 2",
    "EDIT NAME HERE 3",
  ]);
  const [address, setAddress] = useState(
    "123, FULL ADDRESS, LANDMARK\nCITY, STATE - PIN"
  );
  const [contactNumbers, setContactNumbers] = useState(
    "+91 XXXXXXXXXX, +91 XXXXXXXXXX"
  );

  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const [hoveringIndex, setHoveringIndex] = useState(null);
  const [isHoveringAddress, setIsHoveringAddress] = useState(false);
  const [isHoveringContact, setIsHoveringContact] = useState(false);

  const [details, setDetails] = useState({
    bride: {
      text: "Bride Name",
      style: {
        fontSize: "20px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontFamily: "Arial",
      },
    },
    groom: {
      text: "Groom Name",
      style: {
        fontSize: "20px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontFamily: "Arial",
      },
    },
    date: {
      text: "Wedding Date",
      style: {
        fontSize: "20px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontFamily: "Arial",
      },
    },
  });

  const handleNameEdit = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleAddressEdit = (e) => {
    setAddress(e.target.value);
  };

  const handleContactEdit = (e) => {
    setContactNumbers(e.target.value);
  };

  const updateDetail = (key, value) => {
    setDetails({ ...details, [key]: { ...details[key], text: value } });
  };

  const updateStyle = (key, style) => {
    setDetails({ ...details, [key]: { ...details[key], style } });
  };

  return (
    <div className="relative w-full py-12 px-4 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Left floral decoration */}
      <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
        <img
          src={image1}
          alt="Floral decoration"
          className="h-[400px] opacity-90"
        />
      </div>

      {/* Right floral decoration */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
        <img
          src={image1}
          alt="Floral decoration"
          className="h-[400px] opacity-90 scale-x-[-1]"
        />
      </div>

      {/* Content container */}
      <div className="z-10 text-center max-w-lg mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-templateHeading font-semibold text-pink-600 mb-6">
          AWAITING YOUR PRESENCE
        </h1>

        {/* Names section */}
        <div className="mb-8">
          {names.map((name, index) => (
            <div
              key={index}
              className="relative inline-block w-full mb-2"
              onMouseEnter={() => setHoveringIndex(index)}
              onMouseLeave={() => setHoveringIndex(null)}
            >
              {editingIndex === index ? (
                <input
                  value={name}
                  onChange={(e) => handleNameEdit(index, e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  className="text-xl text-blue-600 bg-transparent border-b border-blue-600 text-center outline-none w-full"
                  autoFocus
                />
              ) : (
                <p
                  className="text-xl text-blue-600 cursor-pointer"
                  onClick={() => setEditingIndex(index)}
                >
                  {name}
                </p>
              )}
              {hoveringIndex === index && editingIndex !== index && (
                <button
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  onClick={() => setEditingIndex(index)}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Residence heading */}
        <h2 className="text-xl font-templateHeading font-semibold text-pink-600 mb-2">
          OUR RESIDENCE
        </h2>

        {/* Editable address */}
        <div
          className="relative inline-block mb-6"
          onMouseEnter={() => setIsHoveringAddress(true)}
          onMouseLeave={() => setIsHoveringAddress(false)}
        >
          {isEditingAddress ? (
            <textarea
              value={address}
              onChange={handleAddressEdit}
              onBlur={() => setIsEditingAddress(false)}
              className="text-lg text-blue-600 bg-transparent border-b border-blue-600 text-center outline-none w-full"
              rows={2}
              autoFocus
            />
          ) : (
            <p
              className="text-lg text-blue-600 whitespace-pre-line cursor-pointer"
              onClick={() => setIsEditingAddress(true)}
            >
              {address}
            </p>
          )}
          {isHoveringAddress && !isEditingAddress && (
            <button
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsEditingAddress(true)}
            >
              <Pencil size={16} />
            </button>
          )}
        </div>

        {/* Contact heading */}
        <h2 className="text-xl font-templateHeading font-semibold text-pink-600 mb-2">
          CONTACT NUMBERS
        </h2>

        {/* Editable contact numbers */}
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHoveringContact(true)}
          onMouseLeave={() => setIsHoveringContact(false)}
        >
          {isEditingContact ? (
            <input
              value={contactNumbers}
              onChange={handleContactEdit}
              onBlur={() => setIsEditingContact(false)}
              className="text-lg text-blue-600 bg-transparent border-b border-blue-600 text-center outline-none w-full"
              autoFocus
            />
          ) : (
            <p
              className="text-lg text-blue-600 cursor-pointer"
              onClick={() => setIsEditingContact(true)}
            >
              {contactNumbers}
            </p>
          )}
          {isHoveringContact && !isEditingContact && (
            <button
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsEditingContact(true)}
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const WeddingInvitationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    mobileNo: "",
    response: "accepts",
    greetingsComments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("RSVP Submitted Successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[500px] bg-blue-50 py-12">
        {/* Left floral decoration */}
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
          <img
            src={image1}
            alt="Floral decoration"
            className="h-[400px] opacity-90"
          />
        </div>

        {/* Right floral decoration */}
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
          <img
            src={image1}
            alt="Floral decoration"
            className="h-[400px] opacity-90"
          />
        </div>

        {/* Message */}

        <Message />
      </div>

      {/* Photo Gallery Section */}
      <PhotoGallery />

      {/* Video Embed Section */}
      <YoutubeEmbed />

      {/* RSVP Section */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-7xl text-pink-600 font-templateHeadings lg:text-5xl text-center font-templateFont font-bold mb-20">
            RSVP
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Full Name Field */}
              <div className="flex flex-col">
                <label className="text-blue-400 font-medium mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10"
                  required
                />
              </div>

              {/* Full Address Field */}
              <div className="flex flex-col">
                <label className="text-blue-400 font-medium mb-1">
                  FULL ADDRESS
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10"
                  required
                />
              </div>

              {/* Mobile No Field */}
              <div className="flex flex-col">
                <label className="text-blue-400 font-medium mb-1">
                  MOBILE NO.
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 h-10"
                  required
                />
              </div>
            </div>

            {/* Response Section */}
            <div className="mb-4 flex flex-col gap-2">
              <label className="text-blue-400 font-medium text-sm">
                RESPONSE :
              </label>
              <div className="flex items-center mt-1">
                <div className="relative mr-2">
                  <input
                    type="radio"
                    id="accepts"
                    name="response"
                    value="accepts"
                    checked={formData.response === "accepts"}
                    onChange={handleChange}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div
                    className={`border-2 rounded-full h-5 w-5 flex items-center justify-center ${
                      formData.response === "accepts"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.response === "accepts" && (
                      <div className="bg-white rounded-full h-2 w-2"></div>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="accepts"
                  className="text-blue-400 font-medium text-sm select-none cursor-pointer"
                >
                  ACCEPTS WITH PLEASURE
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Greetings & Comments Section */}
              <div className="mb-6">
                <label className=" text-blue-400 font-medium text-sm block mb-1">
                  GREETINGS & COMMENTS :
                </label>
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    name="greetingsComments"
                    value={formData.greetingsComments}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 h-10 flex-grow"
                  />
                  <input
                    type="text"
                    name="greetingsComments"
                    value={formData.greetingsComments}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 h-10 flex-grow"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border border-gray-300 text-pink-600 font-bold py-2 px-8 hover:bg-pink-50 transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PhotoGallery = () => {
  const [images, setImages] = useState([image3, image3, image3, image3]); // Default images

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  return (
    <div className="py-20 bg-white flex flex-col gap-5">
      <h2 className="text-3xl md:text-7xl font-templateHeadings text-pink-600 text-center font-templateFont font-bold mb-8">
        Photo Gallery
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-4 mb-8">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-40 h-32 md:w-48 md:h-36 overflow-hidden relative group"
          >
            <img
              src={img}
              alt={`Gallery image ${index}`}
              className="w-full h-full object-cover object-center"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(event) => handleImageChange(event, index)}
            />
          </div>
        ))}
      </div>

      <div className="text-center font-templateHeading text-semibold text-blue-400">
        <p>CELEBRATION SUMMARY</p>
      </div>
    </div>
  );
};

const Message = () => {
  const [text, setText] = useState(
    "Your presence will make\n\nwedding day even more special\n\nand unforgettable"
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.innerText);
  };

  return (
    <div className="text-center px-4 max-w-2xl mx-auto flex flex-col items-center justify-center h-full relative group">
      <p
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="text-pink-600 font-templateHeadings leading-relaxed text-lg md:text-5xl font-templateFont font-bold capitalize outline-none"
        onBlur={() => setIsEditing(false)}
        onInput={handleTextChange}
      >
        {text}
      </p>

      {/* Floating Pencil Icon (Appears on Hover) */}
      <button
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

const EditableText = ({ initialText }) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative group">
      <p
        contentEditable={isEditing}
        suppressContentEditableWarning
        className="outline-none cursor-text"
        onBlur={() => setIsEditing(false)}
        onInput={(e) => setText(e.target.innerText)}
      >
        {text}
      </p>

      {/* Floating Pencil Icon (Appears on Hover) */}
      <button
        className="absolute -right-6 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

const RSVPComponent = () => {
  const defaultStyle = {
    fontSize: "18px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "Arial",
  };

  // Initial names array
  const initialNames = [
    "Enter Name 1",
    "Enter Name 2",
    "Enter Name 3",
    "Enter Name 4",
    "Enter Name 5",
    "Enter Name 6",
    "Enter Name 7",
    "Enter Name 8",
    "Enter Name 9",
  ];

  // Create the initial details state from the names array
  const initialDetails = {};
  initialNames.forEach((name, index) => {
    initialDetails[`name${index + 1}`] = {
      text: name,
      style: { ...defaultStyle },
    };
  });
  const [details, setDetails] = useState(initialDetails);

  const updateDetail = (key, value) => {
    setDetails({ ...details, [key]: { ...details[key], text: value } });
  };

  const updateStyle = (key, style) => {
    setDetails({ ...details, [key]: { ...details[key], style } });
  };

  return (
    <div className="rsvp bg-white py-10">
      <div className="top_names w-full flex py-10 px-[10%] items-center justify-between">
        {/* Welcome Section */}
        <div className="flex flex-col gap-5 items-center justify-center">
          <h2 className="text-pink-500 font-templateHeadings lg:text-5xl font-semibold text-3xl ">
            Welcome By
          </h2>
          <div className="flex flex-col items-center justify-center font-semibold text-xl text-blue-400">
            {Object.keys(details)
              .filter((key, index) => {
                const nameIndex = parseInt(key.replace("name", ""));
                return nameIndex >= 0 && nameIndex <= 3; // Using name4 through name7 (indices 3-6)
              })
              .map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center font-semibold text-blue-400"
                >
                  <TextBlock
                    label={`Name ${key.replace("name", "")}`}
                    value={details[key].text}
                    onChange={(val) => updateDetail(key, val)}
                    style={details[key].style}
                    onStyleChange={(style) => updateStyle(key, style)}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Fixed Image */}
        <img src={image2} alt="RSVP" className="h-[300px]" />

        {/* Special Request Section */}
        <div className="flex flex-col gap-5 items-center justify-center">
          <h2 className="text-pink-500 font-templateHeadings lg:text-5xl font-semibold text-3xl">
            Special Request
          </h2>
          <div className="flex flex-col items-center justify-center font-semibold text-xl text-blue-400">
            {Object.keys(details)
              .filter((key, index) => {
                const nameIndex = parseInt(key.replace("name", ""));
                return nameIndex >= 4 && nameIndex <= 6; // Using name4 through name7 (indices 3-6)
              })
              .map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center font-semibold text-blue-400"
                >
                  <TextBlock
                    label={`Name ${key.replace("name", "")}`}
                    value={details[key].text}
                    onChange={(val) => updateDetail(key, val)}
                    style={details[key].style}
                    onStyleChange={(style) => updateStyle(key, style)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Special Request Section */}
      <div className="bottom_names w-full flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center justify-center">
          <h2 className="text-pink-500 font-templateHeadings lg:text-4xl font-semibold text-3xl">
            Special Request
          </h2>
          <div className="flex flex-col items-center justify-center font-semibold text-xl text-blue-400">
            {Object.keys(details)
              .filter((key, index) => {
                const nameIndex = parseInt(key.replace("name", ""));
                return nameIndex >= 7 && nameIndex <= 9; // Using name4 through name7 (indices 3-6)
              })
              .map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center font-semibold text-blue-400"
                >
                  <TextBlock
                    label={`Name ${key.replace("name", "")}`}
                    value={details[key].text}
                    onChange={(val) => updateDetail(key, val)}
                    style={details[key].style}
                    onStyleChange={(style) => updateStyle(key, style)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WeddingVenueCard = () => {
  const [venueAddress, setVenueAddress] = useState(
    "123, FULL ADDRESS, LANDMARK\nCITY, STATE - PIN"
  );
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState({
    venue: {
      text: venueAddress,
      style: {
        fontSize: "18px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontFamily: "Arial",
      },
    },
  });

  const updateDetail = (key, value) => {
    setDetails({ ...details, [key]: { ...details[key], text: value } });
  };

  const updateStyle = (key, style) => {
    setDetails({ ...details, [key]: { ...details[key], style } });
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            details.venue.text
          )}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCoords([data[0].lat, data[0].lon]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
      setLoading(false);
    };

    fetchCoordinates();
  }, [details.venue.text]);

  return (
    <div className="relative w-full py-12 bg-sky-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Left floral decoration */}
      <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
        <img
          src={image1}
          alt="Floral decoration"
          className="h-[400px] opacity-90"
        />
      </div>

      {/* Right floral decoration */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
        <img
          src={image1}
          alt="Floral decoration"
          className="h-[400px] opacity-90 scale-x-[-1]"
        />
      </div>

      {/* Content container */}
      <div className="z-10 text-center max-w-lg mx-auto flex flex-col gap-4 h-full items-center justify-center">
        {/* Static venue title */}
        <h1 className="text-5xl font-templateHeadings font-semibold text-pink-500 mb-4">
          Wedding Venue
        </h1>

        {/* Editable venue address */}
        <TextBlock
          label="Venue Address"
          value={details.venue.text}
          onChange={(val) => updateDetail("venue", val)}
          style={details.venue.style}
          onStyleChange={(style) => updateStyle("venue", style)}
        />

        {/* Map Container */}
        <div className="w-64 h-48 mx-auto mb-4">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Loading map...
            </div>
          ) : coords ? (
            <MapContainer
              center={coords}
              zoom={13}
              className="w-full h-full 
               rounded-md"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={coords} />
            </MapContainer>
          ) : (
            <p className="text-gray-500">Location not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
