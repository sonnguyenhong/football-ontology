import { fboClasses } from "@/actions/config";
import { querier } from "@/actions/querier";
import { notFound, redirect } from "next/navigation";

export default async function Resource({ params }: { params: { id: string } }) {
  const types = await querier.resourceType(decodeURIComponent(params.id));

  if (types.includes(fboClasses.Player)) {
    return redirect(`/player/${params.id}`);
  }
  if (types.includes(fboClasses.Area)) {
    console.log("here");
    return redirect(`/continent/${params.id}`);
  }
  if (types.includes(fboClasses.Country)) {
    return redirect(`/country/${params.id}`);
  }
  if (types.includes(fboClasses.FootballLeague)) {
    return redirect(`/football-league/${params.id}`);
  }
  if (types.includes(fboClasses.FootballTeam)) {
    return redirect(`/football-team/${params.id}`);
  }
  return notFound();
}
