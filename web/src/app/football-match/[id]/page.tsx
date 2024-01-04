import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/style/app.css";
import { Props } from "@/actions/data-types";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = await querier.match(decodeURIComponent(params.id));
	return {
		title: data?.name,
		description: data?.des,
		openGraph: {
			images: [{ url: data?.image ?? "/images/unknown_user.png" }],
		},
	};
}
export default async function Page({ params }: Readonly<Props>) {
	const data = await querier.match(decodeURIComponent(params.id));
	if (!data) {
		return notFound();
	}

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold">
					League season:{" "}
					<Link
						className="text-indigo-500 hover:underline"
						href={`/football-match/${data.id}`}
					>
						{data.name}
					</Link>
				</h1>
			</div>
			<div className="flex flex-col md:flex-row gap-10">
				<div className="max-w-[200px] min-w-[200px]">
					<img
						className="w-full"
						src={data.image ?? "/images/unknown_country.png"}
						alt="league's thumbnail"
					/>
				</div>
				<div className="flex-grow">
					<table className="w-full">
						<tbody>
							<tr>
								<td className="w-[160px]">
									<b>Name</b>
								</td>
								<td>{data.name}</td>
							</tr>
							{data.des && (
								<tr>
									<td>
										<b>About</b>
									</td>
									<td>{data.des}</td>
								</tr>
							)}
							{data.matchDay && (
								<tr>
									<td>
										<b>Match Day</b>
									</td>
									<td>{data.matchDay}</td>
								</tr>
							)}
							{data.homeTeam && data.homeTeamName && (
								<tr>
									<td>
										<b>Home Team</b>
									</td>
									<td>
										<Link
											href={data.homeTeam}
											className="text-sky-500 hover:underline"
										>
											{data.homeTeamName}
										</Link>
									</td>
								</tr>
							)}
							{data.awayTeam && data.awayTeamName && (
								<tr>
									<td>
										<b>Home Team</b>
									</td>
									<td>
										<Link
											href={data.awayTeam}
											className="text-sky-500 hover:underline"
										>
											{data.awayTeamName}
										</Link>
									</td>
								</tr>
							)}
							{data.stadium && data.stadiumName && (
								<tr>
									<td>
										<b>Stadium</b>
									</td>
									<td>
										<Link
											href={data.stadium}
											className="text-sky-500 hover:underline"
										>
											{data.stadiumName}
										</Link>
									</td>
								</tr>
							)}
							{data.result && (
								<tr>
									<td>
										<b>Result</b>
									</td>
									<td>
										{data.homeTeamName} {data.result} {data.awayTeamName}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
