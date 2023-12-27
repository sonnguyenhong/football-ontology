import { fboClasses } from "@/actions/config";
import { querier } from "@/actions/querier";
import { notFound, redirect } from "next/navigation";

export default async function Resource({ params }: { params: { id: string } }) {
  const types = await querier.resourceType(params.id);

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
  if (types.includes(fboClasses.NationalTeam)) {
    return redirect(`/national-team/${params.id}`);
  }

  return notFound();
}
