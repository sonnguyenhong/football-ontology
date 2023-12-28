import { fboClasses } from "@/actions/config";
import { querier } from "@/actions/querier";
import { notFound, redirect } from "next/navigation";

export default async function Resource({ params }: { params: { id: string } }) {

  
  const types = await querier.resourceType(decodeURIComponent(params.id));
  if (types.includes(fboClasses.Player)) {
    return redirect(`/player/${params.id}`);
  }
  if (types.includes(fboClasses.FootballLeague)) {
    return redirect(`/football-league/${params.id}`);
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
    return redirect(`/award/${params.id}`);}
  if (types.includes(fboClasses.FootballMatch)) {
    return redirect(`/football-match/${params.id}`);
  }
  return notFound();
}
