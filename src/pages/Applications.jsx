import NasaCareers from "../components/NasaCareers";

export default function Applications() {
  return (
    <main>
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1>Out in the Wild!</h1>
            <p className="section-lead">
             Take a peek at other wordly explorers at NASA and how they manage to do the work they do.
            </p>
          </div>

          {/* The Component Drops Here */}
          <NasaCareers />
          
        </div>
      </section>
    </main>
  );
}