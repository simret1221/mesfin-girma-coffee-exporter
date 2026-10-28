import { useEffect, useState } from "react";
import { api, Coffee } from "../lib/api";

export default function ApiTest() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCoffees() {
      try {
        const response = await api.getCoffees();
        setCoffees(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load coffees"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCoffees();
  }, []);

  if (loading) {
    return <div>Loading coffees...</div>;
  }

  if (error) {
    return <div>API Error: {error}</div>;
  }

  return (
    <div>
      <h2>Backend Coffee Test</h2>

      {coffees.map((coffee) => (
        <div key={coffee.id}>
          <strong>{coffee.name}</strong>

          <div>
            Origin: {coffee.origin?.name ?? "Not specified"}
          </div>

          <div>
            Grade: {coffee.grade ?? "Not specified"}
          </div>
        </div>
      ))}
    </div>
  );
}