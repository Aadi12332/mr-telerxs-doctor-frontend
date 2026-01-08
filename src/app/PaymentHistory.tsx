import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backlongarrowicon.svg";
import SearchIcon from "../assets/searchIcon.svg";
import CustomSelect from "../components/common/customSelect";

const STATUS_OPTIONS = ["All Status", "Completed", "Pending", "Failed"];
const DATE_OPTIONS = ["Date (Newest)", "Date (Oldest)"];

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("All Status");
  const [date, setDate] = useState("Date (Newest)");

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto lg:px-6 px-3 lg:pt-[94px] pt-10">
        <div className="mb-8">
          <div>
            <img
              src={backarrow}
              alt=""
              className="mb-5 cursor-pointer invert"
              onClick={()=>navigate("/payment-success")}
            />
          </div>
          <div>
            <h2 className="lg:text-[28px] text-[24px] font-medium text-[#000]">
              Payment History
            </h2>
            <p className="text-base lg:text-[20px] text-[#00000080]">
              View all your transactions and payment details
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#00000033] rounded-[20px] p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 px-4 h-[52px] border border-[#D1D5DB] rounded-[12px] flex-1 min-w-[260px]">
              <img src={SearchIcon} alt="" />
              <input
                type="text"
                placeholder="Search by ID or description..."
                className="w-full outline-none text-[16px] placeholder:text-[#9F9F9F]"
              />
            </div>

            <div className="w-[220px]">
              <CustomSelect
                data={STATUS_OPTIONS}
                value={status}
                onChange={setStatus}
                placeholder="All Status"
                openDirection="bottom"
                width="w-full"
                className="!h-[52px]"
              />
            </div>

            <div className="w-[220px]">
              <CustomSelect
                data={DATE_OPTIONS}
                value={date}
                onChange={setDate}
                placeholder="Date (Newest)"
                openDirection="bottom"
                width="w-full"
                className="!h-[52px]"
              />
            </div>
          </div>
        </div>

              <div className="border border-[#00000033] rounded-[20px] overflow-hidden mb-8">
        <table className="w-full text-left">
          <thead className="bg-[#F7F7F7]">
            <tr className="text-[16px] font-medium text-[#000]">
              <th className="px-6 py-4">Payment ID</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="text-[16px]">
            <tr className="border-t">
              <td className="px-6 py-4">PAY-2024-001234</td>
              <td className="px-6 py-4">
                Monthly payout – TechCorp Inc.
              </td>
              <td className="px-6 py-4">
                Jun 28, 2024<br />14:30
              </td>
              <td className="px-6 py-4">$2,450</td>
              <td className="px-6 py-4 text-green-600 font-medium">
                Completed
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">PAY-2024-001235</td>
              <td className="px-6 py-4">
                Project payment – StartupXYZ
              </td>
              <td className="px-6 py-4">
                Jun 25, 2024<br />09:15
              </td>
              <td className="px-6 py-4">$2,450</td>
              <td className="px-6 py-4 text-yellow-500 font-medium">
                Pending
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">PAY-2024-001236</td>
              <td className="px-6 py-4">
                Consulting fees – Global Solutions
              </td>
              <td className="px-6 py-4">
                Jun 20, 2024<br />16:45
              </td>
              <td className="px-6 py-4">$2,450</td>
              <td className="px-6 py-4 text-red-500 font-medium">
                Failed
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">PAY-2024-001237</td>
              <td className="px-6 py-4">
                Design services – Creative Agency
              </td>
              <td className="px-6 py-4">
                Jun 18, 2024<br />11:20
              </td>
              <td className="px-6 py-4">$2,450</td>
              <td className="px-6 py-4 text-green-600 font-medium">
                Completed
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">PAY-2024-001238</td>
              <td className="px-6 py-4">
                Development work – TechCorp Inc.
              </td>
              <td className="px-6 py-4">
                Jun 15, 2024<br />13:00
              </td>
              <td className="px-6 py-4">$2,450</td>
              <td className="px-6 py-4 text-red-500 font-medium">
                Failed
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <div className="bg-[#E5F8FC] p-3 text-center">
        <span className="text-[#b0b0b0]">
          CompanyName2025 © All Rights Reserved
        </span>
      </div>
    </>
  );
}
