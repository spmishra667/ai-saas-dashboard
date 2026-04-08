type CardProps = {
  title: string;
  value: string;
};

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="text-gray-500 dark:text-gray-300 text-sm">
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2 dark:text-white">
        {value}
      </p>
    </div>
  );
}