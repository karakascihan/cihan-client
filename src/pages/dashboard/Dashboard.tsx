



const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Visitors",
      data: [120, 190, 300, 500, 200, 300],
      fill: false,
      borderColor: "#4F46E5",
      tension: 0.3,
    },
  ],
};

const barData = {
  labels: ["Product A", "Product B", "Product C", "Product D"],
  datasets: [
    {
      label: "Sales",
      data: [150, 200, 120, 300],
      backgroundColor: ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"],
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Anasayfa</h1>

    
    
    </div>
  );
}
