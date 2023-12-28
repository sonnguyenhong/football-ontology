import { fboClasses } from "@/actions/config";
import { querier } from "@/actions/querier";
import { notFound, redirect } from "next/navigation";

export default async function Resource({ params }: { params: { id: string } }) {
  const types = await querier.resourceType(decodeURIComponent(params.id));

  if (types.includes(fboClasses.Player)) {
    return redirect(`/player/${params.id}`);
  }
  if (types.includes(fboClasses.Area)) {
    return redirect(`/continent/${params.id}`);
  }
  if (types.includes(fboClasses.Country)) {
    return redirect(`/country/${params.id}`);
  }
  if (types.includes(fboClasses.League)) {
    return redirect(`/league/${params.id}`);
  }
  if (types.includes(fboClasses.LeagueSeason)) {
    return redirect(`/league-season/${params.id}`);
  }
  if (types.includes(fboClasses.FootballTeam)) {
    return redirect(`/football-team/${params.id}`);
  }
  if(types.includes(fboClasses.Coach)){
    return redirect(`/coach/${params.id}`);
  }
  if(types.includes(fboClasses.Stadium)){
    return redirect(`/stadium/${params.id}`);
  }
  if(types.includes(fboClasses.Award)){
    return redirect(`/award/${params.id}`);
  }
  return notFound();
}
