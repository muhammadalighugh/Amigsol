
"use client";
import { useState } from "react";
import { User, CheckCircle, X, MoreVertical, Eye } from "lucide-react";

export default function ApplicationsPage() {
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 1,
      fullName: "Alex Rodriguez",
      name: "Alex Rodriguez", // For display
      email: "alex@example.com",
      type: "Developer",
      status: "Pending",
      appliedDate: "2024-01-16",
      address: "789 Dev Street",
      city: "San Francisco",
      country: "United States",
      linkedinProfile: "https://linkedin.com/in/alexrodriguez",
      website: "https://alexrodriguez.dev",
      whatsappContact: "+1234567890",
      education: [
        {
          degreeName: "Bachelor of Computer Science",
          institution: "Stanford University",
          startYear: "2015",
          endYear: "2019",
          description: "Specialized in software engineering.",
        },
        {
          degreeName: "Master of AI",
          institution: "MIT",
          startYear: "2019",
          endYear: "2021",
          description: "Focused on machine learning and AI.",
        },
      ],
      skills: ["React", "Node.js", "Python"],
      experienceLevel: "Senior (5+ years)",
      githubLink: "https://github.com/alexrodriguez",
      portfolioLink: "https://portfolio.alexrodriguez.dev",
      availability: "Full-time",
      ndaAccepted: true,
      termsAccepted: true,
      privacyAccepted: true,
    },
    {
      id: 2,
      fullName: "Lisa Wang",
      name: "Lisa Wang",
      email: "lisa@example.com",
      type: "Referral",
      status: "Pending",
      appliedDate: "2024-01-15",
      address: "456 Marketing Ave",
      city: "New York",
      country: "United States",
      linkedinProfile: "https://linkedin.com/in/lisawang",
      website: "https://lisawang.marketing",
      whatsappContact: "+1987654321",
      education: [
        {
          degreeName: "Bachelor of Business",
          institution: "NYU",
          startYear: "2016",
          endYear: "2020",
          description: "Focused on marketing and communications.",
        },
      ],
      hearAboutUs: "Social Media",
      targetAudience: ["Small Business", "Startups"],
      marketingChannels: ["Social Media", "Blog"],
      payoutMethod: "PayPal",
      termsAccepted: true,
      privacyAccepted: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleView = (application) => {
    setSelectedApplication(application);
    setEditedStatus(application.status);
    setIsModalOpen(true);
  };

  const handleStatusChange = () => {
    setPendingApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: editedStatus } : app
      )
    );
    setIsModalOpen(false);
  };

  const statusOptions = ["Pending", "Approved", "Rejected"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">Partner Applications</h2>
          <p className="text-gray-600 dark:text-gray-400">Review and manage partner applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {pendingApplications.length} Pending
          </span>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {pendingApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.email}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      application.type === "Developer" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {application.type} Partner
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Applied Date</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{application.appliedDate}</p>
                  </div>
                  {application.type === "Developer" ? (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience Level</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.experienceLevel || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(application.skills) && application.skills.length > 0 ? (
                            application.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">No skills provided</span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Audience</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Array.isArray(application.targetAudience) && application.targetAudience.length > 0
                            ? application.targetAudience.join(", ")
                            : "N/A"}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marketing Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(application.marketingChannels) && application.marketingChannels.length > 0 ? (
                            application.marketingChannels.map((channel) => (
                              <span
                                key={channel}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                              >
                                {channel}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600 dark:text-gray-400">No channels provided</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleView(application)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button className="text-gray-600 hover:text-gray-900 transition-colors p-2">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">{selectedApplication.fullName}'s Application</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Personal Information */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Full Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.fullName || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Email</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.email || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Address</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.address || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">City</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.city || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Country</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.country || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {selectedApplication.linkedinProfile ? (
                        <a href={selectedApplication.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedApplication.linkedinProfile}
                        </a>
                      ) : "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Website</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {selectedApplication.website ? (
                        <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedApplication.website}
                        </a>
                      ) : "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">WhatsApp Contact</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.whatsappContact || "N/A"}</dd>
                  </div>
                </dl>
              </section>

              {/* Education Background */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Education Background</h3>
                {Array.isArray(selectedApplication.education) && selectedApplication.education.length > 0 ? (
                  <div className="space-y-4">
                    {selectedApplication.education.map((edu, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{edu.degreeName || "N/A"}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.institution || "N/A"} ({edu.startYear || "N/A"} - {edu.endYear || "N/A"})
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{edu.description || "No description provided"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No education information provided.</p>
                )}
              </section>

              {/* Program Specific Details */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Program Specific Details</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Partnership Type</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.type || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Applied Date</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.appliedDate || "N/A"}</dd>
                  </div>
                  {selectedApplication.type === "Developer" ? (
                    <>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Skills</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {Array.isArray(selectedApplication.skills) && selectedApplication.skills.length > 0
                            ? selectedApplication.skills.join(", ")
                            : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Experience Level</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.experienceLevel || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">GitHub Link</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {selectedApplication.githubLink ? (
                            <a href={selectedApplication.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {selectedApplication.githubLink}
                            </a>
                          ) : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Portfolio Link</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {selectedApplication.portfolioLink ? (
                            <a href={selectedApplication.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {selectedApplication.portfolioLink}
                            </a>
                          ) : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Availability</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.availability || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">NDA Accepted</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.ndaAccepted ? "Yes" : "No"}</dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Heard About Us</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.hearAboutUs || "N/A"}</dd>
                      </div>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Target Audience</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {Array.isArray(selectedApplication.targetAudience) && selectedApplication.targetAudience.length > 0
                            ? selectedApplication.targetAudience.join(", ")
                            : "N/A"}
                        </dd>
                      </div>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Marketing Channels</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {Array.isArray(selectedApplication.marketingChannels) && selectedApplication.marketingChannels.length > 0
                            ? selectedApplication.marketingChannels.join(", ")
                            : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Payout Method</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.payoutMethod || "N/A"}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </section>

              {/* Agreements */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Agreements</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Terms Accepted</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.termsAccepted ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Privacy Accepted</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedApplication.privacyAccepted ? "No" : "No"}</dd>
                  </div>
                </dl>
              </section>

              {/* Status Update */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Update Application Status</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleStatusChange}
                    className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Status
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
