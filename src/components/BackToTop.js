
export default function BackToTop() {
  return (
<button className="back-to-top" id="backToTop" aria-label="Back to Top">
    <span className="progress-circle">
                <svg viewBox="0 0 100 100">
                    <circle className="bg" cx="50" cy="50" r="40"></circle>
                    <circle className="progress" cx="50" cy="50" r="40"></circle>
                </svg>
                <span className="progress-percentage" id="progressPercentage">0%</span>
    </span>
  </button>
  );
}
