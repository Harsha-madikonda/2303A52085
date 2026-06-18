import type { NotificationType } from "../types/notification";

interface FilterProps {
  selectedType: NotificationType | undefined;
  onTypeChange: (type: NotificationType | undefined) => void;
}

export const Filter: React.FC<FilterProps> = ({ selectedType, onTypeChange }) => {
  const types: (NotificationType | "All")[] = ["All", "Event", "Result", "Placement"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onTypeChange(value === "All" ? undefined : (value as NotificationType));
  };

  return (
    <div className="filter-container">
      <label htmlFor="type-filter" className="filter-label">
        Filter by Type:
      </label>
      <select
        id="type-filter"
        className="filter-select"
        value={selectedType || "All"}
        onChange={handleChange}
      >
        {types.map((type) => (
          <option key={type} value={type === "All" ? "" : type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
