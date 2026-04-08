type CardProps = {
  title: string;
  value: string;
};

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
      <h3 className="text-gray-500 dark:text-gray-300 text-sm">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2 dark:text-white">
        {value}
      </p>
    </div>
  );
}