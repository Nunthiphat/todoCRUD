import EditWorkForm from "@/components/EditWorkForm";

const getWorkById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/works/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch work");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditWork({ params }) {
  const { id } = params;
  const { work } = await getWorkById(id);
  const { title, description } = work;

  return <EditWorkForm id={id} title={title} description={description} />;
}