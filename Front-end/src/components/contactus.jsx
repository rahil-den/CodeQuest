import React from "react";

export default function ContactUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-start gap-12">
        {/* Contact Form */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-4xl font-bold text-primary mb-6">Contact Us</h2>
          <p className="text-lg  mb-6 mr-4">
            Have questions or feedback? Fill out the form, and we’ll get back to you!
          </p>
          <form className="space-y-4">
            <div className="flex flex-col items-start">
              <label className="text-lg font-medium text-primary">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-lg font-medium text-primary">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-lg font-medium text-primary">Message</label>
              <textarea
                type="textarea"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              className="px-20 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Location Map */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-4xl font-bold text-primary mb-6">Our Location</h2>
          <div className="w-full h-80 rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full border-none"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Ahmedabad&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" ></iframe>
            </div>
            </div>
        </div>
        </section>
    );
    }
   