"use client";
import { useState } from "react";
import { Users, Search, Plus, Download, Eye, Edit, Trash2, User, X } from "lucide-react";

export default function PartnersPage() {
  const [partners, setPartners] = useState([
    {
      id: 1,
      fullName: "John Smith",
      name: "John Smith", // For display
      email: "john@example.com",
      type: "Developer",
      status: "Active",
      earnings: "$2,450",
      joinDate: "2024-01-15",
      address: "123 Tech Street",
      city: "San Francisco",
      country: "United States",
      linkedinProfile: "https://linkedin.com/in/johnsmith",
      website: "https://johnsmith.dev",
      whatsappContact: "+1234567890",
      education: [
        {
          degreeName: "Bachelor of Computer Science",
          institution: "Stanford University",
          startYear: "2015",
          endYear: "2019",
          description: "Focused on software engineering and AI."
        },
        {
          degreeName: "Master of AI",
          institution: "MIT",
          startYear: "2019",
          endYear: "2021",
          description: "Advanced machine learning techniques."
        }
      ],
      skills: ["React", "Node.js", "AI/ML"],
      experienceLevel: "Senior (5+ years)",
      githubLink: "https://github.com/johnsmith",
      portfolioLink: "https://portfolio.johnsmith.dev",
      availability: "Full-time",
      ndaAccepted: true,
      termsAccepted: true,
      privacyAccepted: true
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "Referral",
      status: "Active",
      earnings: "$1,230",
      joinDate: "2024-01-14",
      address: "456 Marketing Ave",
      city: "New York",
      country: "United States",
      linkedinProfile: "https://linkedin.com/in/sarahjohnson",
      website: "https://sarahmarketing.com",
      whatsappContact: "+1987654321",
      education: [],
      hearAboutUs: "Social Media",
      targetAudience: ["Small Business", "Startups"],
      marketingChannels: ["Social Media", "Blog Writing"],
      payoutMethod: "PayPal",
      termsAccepted: true,
      privacyAccepted: true
    },
    {
      id: 3,
      fullName: "Mike Chen",
      name: "Mike Chen",
      email: "mike@example.com",
      type: "Developer",
      status: "Pending",
      earnings: "$0",
      joinDate: "2024-01-16",
      address: "789 Dev Road",
      city: "Beijing",
      country: "China",
      linkedinProfile: "https://linkedin.com/in/mikechen",
      website: "",
      whatsappContact: "+86123456789",
      education: [
        {
          degreeName: "Bachelor of Engineering",
          institution: "Tsinghua University",
          startYear: "2014",
          endYear: "2018",
          description: "Software development focus."
        }
      ],
      skills: ["Python", "Data Science", "DevOps"],
      experienceLevel: "Mid-level (2-5 years)",
      githubLink: "https://github.com/mikechen",
      portfolioLink: "",
      availability: "20 hours/week",
      ndaAccepted: true,
      termsAccepted: true,
      privacyAccepted: true
    },
    {
      id: 4,
      fullName: "Emily Davis",
      name: "Emily Davis",
      email: "emily@example.com",
      type: "Referral",
      status: "Active",
      earnings: "$3,120",
      joinDate: "2024-01-13",
      address: "101 Referral Lane",
      city: "London",
      country: "United Kingdom",
      linkedinProfile: "https://linkedin.com/in/emilydavis",
      website: "https://emilyreferrals.co.uk",
      whatsappContact: "+447890123456",
      education: [
        {
          degreeName: "Bachelor of Business",
          institution: "Oxford University",
          startYear: "2016",
          endYear: "2020",
          description: "Marketing and business development."
        }
      ],
      hearAboutUs: "Friend/Referral",
      targetAudience: ["Medium Enterprise", "Large Corporation"],
      marketingChannels: ["Email Marketing", "Events/Conferences"],
      payoutMethod: "Bank Transfer",
      termsAccepted: true,
      privacyAccepted: true
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleView = (partner) => {
    setSelectedPartner(partner);
    setEditedStatus(partner.status);
    setIsModalOpen(true);
  };

  const handleSaveStatus = () => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === selectedPartner.id ? { ...p, status: editedStatus } : p
      )
    );
    setIsModalOpen(false);
  };

  const statusOptions = ["Active", "Pending", "Inactive", "Rejected"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">Partners</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all your partners</p>
        </div>
        <button className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search partners..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white">
            <option>All Types</option>
            <option>Developer</option>
            <option>Referral</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#8BE31F] transition-colors flex items-center text-gray-600 dark:text-gray-400">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-black dark:text-white">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.type === "Developer" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {partner.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        partner.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : partner.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : partner.status === "Inactive"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-white font-medium">
                    {partner.earnings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{partner.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(partner)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">{selectedPartner.fullName}'s Details</h2>
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
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.fullName}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Email</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.email}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Address</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.address}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">City</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.city}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Country</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.country}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {selectedPartner.linkedinProfile ? (
                        <a href={selectedPartner.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedPartner.linkedinProfile}
                        </a>
                      ) : "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Website</dt>
                    <dd className="text-gray-900 dark:text-gray-100">
                      {selectedPartner.website ? (
                        <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedPartner.website}
                        </a>
                      ) : "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">WhatsApp Contact</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.whatsappContact}</dd>
                  </div>
                </dl>
              </section>

              {/* Education Background */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Education Background</h3>
                {selectedPartner.education.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPartner.education.map((edu, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{edu.degreeName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
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
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.type}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Join Date</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.joinDate}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Earnings</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.earnings}</dd>
                  </div>
                  {selectedPartner.type === "Developer" ? (
                    <>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Skills</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.skills.join(", ") || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Experience Level</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.experienceLevel || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">GitHub Link</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {selectedPartner.githubLink ? (
                            <a href={selectedPartner.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {selectedPartner.githubLink}
                            </a>
                          ) : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Portfolio Link</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {selectedPartner.portfolioLink ? (
                            <a href={selectedPartner.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {selectedPartner.portfolioLink}
                            </a>
                          ) : "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Availability</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.availability || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">NDA Accepted</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.ndaAccepted ? "Yes" : "No"}</dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Heard About Us</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.hearAboutUs || "N/A"}</dd>
                      </div>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Target Audience</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.targetAudience?.join(", ") || "N/A"}</dd>
                      </div>
                      <div className="md:col-span-2">
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Marketing Channels</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.marketingChannels?.join(", ") || "N/A"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700 dark:text-gray-300">Payout Method</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.payoutMethod || "N/A"}</dd>
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
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.termsAccepted ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700 dark:text-gray-300">Privacy Accepted</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{selectedPartner.privacyAccepted ? "Yes" : "No"}</dd>
                  </div>
                </dl>
              </section>

              {/* Edit Status */}
              <section>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Edit Status</h3>
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
                    onClick={handleSaveStatus}
                    className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors"
                  >
                    Save Status
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