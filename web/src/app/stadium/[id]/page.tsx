import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.stadium(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Stadium:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/player/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[200px] min-w-[200px]">
          <img className="w-full" src={data.image ?? "/images/unknown_user.png"} alt="coach's avatar" />
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
              {data.age && (
                <tr>
                  <td>
                    <b>Age</b>
                  </td>
                  <td>{data.age}</td>
                </tr>
              )}
              {data.stadiumCapacity && (
                <tr>
                  <td>
                    <b>Capacity</b>
                  </td>
                  <td>{data.stadiumCapacity}</td>
                </tr>
              )}
              {data.age&& (
                <tr>
                  <td>
                    <b>Age</b>
                  </td>
                  <td>{data.age}</td>
                </tr>
              )}
             
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
