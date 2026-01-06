type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmPayoutModal({ onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#B2E5FD] rounded-[20px] max-w-[998px] w-full p-8">
        <p className="text-[26px] text-[#000] mb-6">
          Confirm Payout Request
        </p>

        <div className="bg-white rounded-[16px] p-6 mb-6">
          <div className="flex justify-between mb-4">
            <p className="text-[20px] text-[#00000080]">Amount</p>
            <p className="text-[20px] text-[#000]">$300</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="text-[20px] text-[#00000080]">
              Processing Fee (2.9%)
            </p>
            <p className="text-[20px] text-[#000]">-$8.70</p>
          </div>

          <div className="border-t border-[#0000004D] my-4" />

          <div className="flex justify-between mb-4">
            <p className="text-[20px] text-[#00000080]">
              You will receive
            </p>
            <p className="text-[20px] text-[#000]">$291.30</p>
          </div>

          <div className="flex justify-between">
            <p className="text-[20px] text-[#00000080]">Bank Account</p>
            <p className="text-[20px] text-[#000]">**** 4892</p>
          </div>
        </div>

        <p className="text-[16px] text-[#00000080] mb-8">
          Please review the details above. The funds will be transferred to your
          selected bank account within 1-3 business days.
        </p>

        <div className="flex justify-between gap-6">
          <button
            className="border border-[#0000004D] text-[20px] px-10 rounded-[10px] h-[50px] w-full"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-[#00598D] text-white text-[20px] px-10 rounded-[10px] h-[50px] w-full"
            onClick={onConfirm}
          >
            Confirm Payout
          </button>
        </div>
      </div>
    </div>
  );
}
