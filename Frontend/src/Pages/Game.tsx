import { CircularProgress } from "@mui/material";
import { useGetAllGames } from "../Query/useQueries";
import GameCard from "../Components/GameCard";

function Game({ view = "all" }) {
  const { isLoading, data, isError, refetch } = useGetAllGames();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Games</h2>

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load games</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No games available</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((g) => (
            <GameCard key={g.gameId} data={g} isAllFields={false} view={"hr"} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Game;