import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/style/app.css";
import { Metadata } from "next";
import { Props } from "@/actions/data-types";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = await querier.player(decodeURIComponent(params.id));
	return {
		title: data?.name,
		description: data?.des,
		openGraph: {
			images: [{ url: data?.image ?? "/images/unknown_user.png" }],
		},
	};
}

export default async function Page({ params }: Readonly<Props>) {
	const data = await querier.player(decodeURIComponent(params.id));
	if (!data) {
		return notFound();
	}

	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold">
					Player:{" "}
					<Link
						className="text-indigo-500 hover:underline"
						href={`/player/${data.id}`}
					>
						{data.name}
					</Link>
				</h1>
			</div>
			<div className="flex flex-col md:flex-row gap-10">
				<div className="max-w-[200px] min-w-[200px]">
					<img
						className="w-full"
						src={data.image ?? "/images/unknown_user.png"}
						alt="player's avatar"
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
							{data.positionName && (
								<tr>
									<td>
										<b>Position</b>
									</td>
									<td>{data.positionName.substring(31)}</td>
								</tr>
							)}
							{data.nationality && (
								<tr>
									<td>
										<b>Nationality</b>
									</td>
									<td>{data.nationality}</td>
								</tr>
							)}
							{data.assists && (
								<tr>
									<td>
										<b>Assists</b>
									</td>
									<td>{data.assists}</td>
								</tr>
							)}
							{data.height && (
								<tr>
									<td>
										<b>Height</b>
									</td>
									<td>{data.height} cm</td>
								</tr>
							)}
							{data.weight && (
								<tr>
									<td>
										<b>Weight</b>
									</td>
									<td>{data.weight} kg</td>
								</tr>
							)}
							{data.transactionFee && (
								<tr>
									<td>
										<b>Transaction Fee</b>
									</td>
									<td>{data.transactionFee}</td>
								</tr>
							)}
							{data.goals && (
								<tr>
									<td>
										<b>Goals</b>
									</td>
									<td>{data.goals}</td>
								</tr>
							)}
							{data.footballTeam && data.footballTeamName && (
								<tr>
									<td>
										<b>Team</b>
									</td>
									<td>
										<Link
											href={data.footballTeam}
											className="text-sky-500 hover:underline"
										>
											{data.footballTeamName}
										</Link>
									</td>
								</tr>
							)}
							{data.seasons.length > 0 && (
								<tr>
									<td>
										<b>League seasons</b>
									</td>
									<td>
										<ul className="list-disc mx-4">
											{data.seasons.map((item) => {
												return (
													<li key={item.ls}>
														<Link
															href={item.ls}
															className="inline text-sky-500 hover:underline"
														>
															{item.lsName} {item.year && `(${item.year})`}
														</Link>
													</li>
												);
											})}
										</ul>
									</td>
								</tr>
							)}
							{data.titles.length > 0 && (
								<tr>
									<td>
										<b>Titles</b>
									</td>
									<td>
										<ul className="list-disc mx-4">
											{data.titles.map((item, index) => {
												return (
													<li key={index}>
														<Link
															href={item.title}
															className="inline text-sky-500 hover:underline"
														>
															{item.titleName}
														</Link>
													</li>
												);
											})}
										</ul>
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
