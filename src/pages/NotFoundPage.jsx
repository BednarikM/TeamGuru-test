import Header from "../components/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="page-content">
        <p className="page-content__error-page">{`404   Ops page not found`}</p>
      </main>
    </>
  );
}
