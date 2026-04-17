const STEPS = [
  { key: "pending", label: "Pending" },
  { key: "paid", label: "Paid" },
  { key: "processing", label: "Processing" },
  { key: "ordered_from_china", label: "Ordered from China" },
  { key: "arrived_warehouse", label: "Arrived at Warehouse" },
  { key: "in_transit", label: "In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function DeliveryTimeline({ status }) {
  if (status === "cancelled") {
    return (
      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        This order has been cancelled.
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((step) => step.key === status);

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3">
        {STEPS.map((step, index) => {
          const completed = index <= currentIndex;
          const active = index === currentIndex;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  completed
                    ? "bg-black border-black"
                    : "bg-white border-gray-300"
                }`}
              />
              <p
                className={`text-sm ${
                  active
                    ? "font-semibold text-black"
                    : completed
                    ? "text-gray-800"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}