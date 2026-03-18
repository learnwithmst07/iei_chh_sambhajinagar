import React from 'react'
import { X } from 'lucide-react'

const PastLeadersModal = ({ isOpen, onClose }) => {
  const pastLeaders = [
    { srNo: 1, chairman: "Prof. H. M. Ganeshrao", secretary: "Prof. P. M. Palimkar", session: "1974-1976" },
    { srNo: 2, chairman: "Er. K. Ramchandrarao", secretary: "Prof. K. M. Kothari", session: "1976-1977" },
    { srNo: 3, chairman: "Prof. N. G. Wagh", secretary: "Prof. P. K. Lalsare", session: "1977-1978" },
    { srNo: 4, chairman: "Er. Y. A. Rohekar", secretary: "Prof. Z. H. Chudiwal", session: "1978-1979" },
    { srNo: 5, chairman: "Prof. H. M. Ganeshrao", secretary: "Prof. Z. H. Chudiwal", session: "1979-1980" },
    { srNo: 6, chairman: "Er. D. L. Garud", secretary: "Prof. Z. H. Chudiwal", session: "1980-1982" },
    { srNo: 7, chairman: "Er. S. T. Deokule", secretary: "Prof. V. M. Kadam", session: "1982-1984" },
    { srNo: 8, chairman: "Er. D. N. Kulkarni", secretary: "Prof. V. M. Kadam", session: "1984-1986" },
    { srNo: 9, chairman: "Er. G. V. Abhange", secretary: "Prof. P. K. Lalsare", session: "1986-1990" },
    { srNo: 10, chairman: "Er. V. M. Ranade", secretary: "Prof. Z. H. Chudiwal", session: "1990-1992" },
    { srNo: 11, chairman: "Er. V. M. Ranade", secretary: "Dr. V. G. Achawal", session: "1992-1993" },
    { srNo: 12, chairman: "Er. V. K. Sanap", secretary: "Dr. V. G. Achawal", session: "1993-1994" },
    { srNo: 13, chairman: "Prof. P. S. Borade", secretary: "Dr. V. G. Achawal", session: "1994-1996" },
    { srNo: 14, chairman: "Er. S. A. Nagre", secretary: "Er. P. G. Chhajed", session: "1996-1998" },
    { srNo: 15, chairman: "Er. A. A. Jawalekar", secretary: "Er. P. G. Chhajed", session: "1998-2000" },
    { srNo: 16, chairman: "Er. C. D. Fakir", secretary: "Er. R. C. Varde", session: "2000-2002" },
    { srNo: 17, chairman: "Er. P. G. Chhajed", secretary: "Prof. J. B. Sankpal", session: "2002-2004" },
    { srNo: 18, chairman: "Er. M. V. Domkondwar", secretary: "Er. B. N. Rathi", session: "2004-2006" },
    { srNo: 19, chairman: "Er. V. V. Gaikwad", secretary: "Dr. Uttam B. Kalwane", session: "2006-2008" },
    { srNo: 20, chairman: "Er. B. N. Kandarphale", secretary: "Dr. Mrs.V.A.Kulkarni", session: "2008-2010" },
    { srNo: 21, chairman: "Er. D. R. Kandi", secretary: "Er. Sacheen M. Mulay", session: "2010-2012" },
    { srNo: 22, chairman: "Prof. S. M. Patil (Administrator)", secretary: "-", session: "09/4/2013 to 18/8/2013" },
    { srNo: 23, chairman: "Er. B. N. Rathi", secretary: "Er. N. R. Varma", session: "18/8/2013 to 29/12/2013" },
    { srNo: 24, chairman: "Er. E. B. Jogdand", secretary: "Er. M. L. Patil", session: "29/12/2013 to 06/10/2014" },
    { srNo: 25, chairman: "Er. Sacheen M. Mulay", secretary: "Er. S. D. Chandsure", session: "2014-2016" },
    { srNo: 26, chairman: "Dr. S. D. Deshmukh", secretary: "Er. A. K. Sasane", session: "2016-2018" },
    { srNo: 27, chairman: "Dr. D. C. Gour", secretary: "Prof. S. B. Mundhe", session: "2018-2021" },
    { srNo: 28, chairman: "Dr. Uttam B. Kalwane", secretary: "Dr. R. R. Deshmukh", session: "2021-2023" },
    { srNo: 29, chairman: "Dr. U. B. Shinde", secretary: "Er. K. M. I. Sayyad", session: "2023-2024" },
    { srNo: 30, chairman: "Dr. A. S. Garudkar", secretary: "Er. K. M. I. Sayyad", session: "2024-2025" },
    { srNo: 31, chairman: "Er. A. A. Patil", secretary: "Dr. S. P. Abhang", session: "2025-2027" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="sticky top-0 right-0 absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="p-3 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Past Chairmen and Secretaries</h2>
          
          <div className="overflow-x-auto -mx-3 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full px-3 sm:px-6 lg:px-8">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-left font-semibold whitespace-nowrap">Sr.</th>
                    <th className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-left font-semibold whitespace-nowrap">Chairman</th>
                    <th className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-left font-semibold whitespace-nowrap">Secretary</th>
                    <th className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-left font-semibold whitespace-nowrap">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {pastLeaders.map((leader, index) => (
                    <tr 
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 font-semibold text-gray-900 whitespace-nowrap">{leader.srNo}</td>
                      <td className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-gray-800 text-xs sm:text-sm">{leader.chairman}</td>
                      <td className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-gray-800 text-xs sm:text-sm">{leader.secretary}</td>
                      <td className="border border-gray-300 px-1 sm:px-3 py-2 sm:py-3 text-gray-700 font-medium whitespace-nowrap text-xs sm:text-sm">{leader.session}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastLeadersModal;
