import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SearchContainer } from "@/components/smart/searchContainer/SearchContainer";
import { ResultsType } from "@/components/smart/searchContainer/types";
import { apiService } from "@/core/services/apiService";
import { SwitchTheme } from "@/components/simple/switchTheme";

export const getServerSideProps: GetServerSideProps<ResultsType> = async (context) => {
  const page = context.params?.page || "1";
  const {
    info: { pages },
    results,
  } = await apiService.fetchSearchResults(process.env.BASE_URL as string, '', Number(page));

  return {
    props: {
      results,
      currentPage: parseInt(page as string, 10),
      isError: false,
      pages,
    },
  };
};

const Page = (props: ResultsType): JSX.Element => {
  const router = useRouter();

  const handlePageChange = (newPage: number):void => {
    void router.push(`/page/${newPage}`);
  };

  return (
    <>
      <SwitchTheme />
      <SearchContainer {...props} onPageChange={handlePageChange} />
    </>
  );
};

export default Page;
