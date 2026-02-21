import { Grid } from "@mui/material";
import { useGetAllGames } from "../Query/useQueries";
import GameCard from "../Components/GameCard";

function Game({view="all"}) {
  const { isLoading, data, isError, refetch } = useGetAllGames();

  return (
    <>
      {!isLoading && (
        <Grid container spacing={2}>
          {data.data.map((g) => {
            return (
              <Grid item xs={12} md={4} key={g.gameId}>
                <GameCard data={g} isAllFields={false} view={"hr"} />{" "}
              </Grid>
            );
          })}
        </Grid>
        
      )}
    </>
  );
}
export default Game;
