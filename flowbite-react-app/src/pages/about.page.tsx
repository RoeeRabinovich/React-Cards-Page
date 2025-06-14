import MapView from "../components/MapView";

const About = () => {
  // Add address object for MapView
  const officeAddress = {
    street: "R-Cards St",
    houseNumber: "1234",
    city: "R-Cards City",
    country: "R-Cards Country",
    state: "R-Cards State",
    zip: "12345",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="space-y-4">
          <h1 className="text-center text-4xl font-bold text-gray-800 sm:text-5xl dark:text-white">
            About R-Cards
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            Welcome to R-Cards ✨, your ultimate solution for creating,
            browsing, and managing business cards with ease. Our innovative
            platform is designed to cater to professionals and businesses of all
            sizes, offering a seamless and efficient way to handle all your
            business card needs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">
            Our Mission 🎯
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            At R-Cards, we strive to simplify the way you network and manage
            your professional connections. Our mission is to provide a
            user-friendly, powerful tool that helps you create stunning business
            cards, efficiently manage your contacts, and enhance your
            professional presence.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">
            What We Offer 🌟
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                Create ✏️
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Design unique and professional business cards effortlessly with
                our intuitive creation tools. Choose from a variety of
                templates, customize every detail, and ensure your business card
                stands out.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                Browse 🔍
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore a wide range of business cards within our app. Find
                inspiration, discover new contacts, and connect with
                professionals from various industries.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                CRM for Admins 📊
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our comprehensive CRM features enable admins to manage business
                card data, users data, and maintain valuable business
                relationships. Stay on top of your networking game with advanced
                analytics and reporting tools.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white">
            Contact Us 📬
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Email:</strong> RCards@email.com 📧
            </p>
            <p>
              <strong>Phone:</strong> 123-456-7890 📱
            </p>
            <p>
              <strong>Address:</strong> {officeAddress.houseNumber}{" "}
              {officeAddress.street}, {officeAddress.city},{" "}
              {officeAddress.country} 📍
            </p>

            {/* Add MapView component */}
            <div className="mt-6 h-[300px] w-full overflow-hidden rounded-lg">
              <MapView address={officeAddress} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
