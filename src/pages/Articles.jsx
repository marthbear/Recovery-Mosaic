import { useNavigate } from "react-router-dom";
import "./Books.css";

const articlesList = [
  {
    id: 1,
    title:
      "APA's Apology to Black, Indigenous and People of Color for Its Support of Structural Racism in Psychiatry",
    url: "https://www.psychiatry.org/newsroom/apa-apology-for-its-support-of-structural-racism-in-psychiatry",
  },
  {
    id: 2,
    title:
      "The First Step to Recovery Is Admitting You Are Not Powerless Over Your Privilege by Jessica Hoppe",
    url: "https://gen.medium.com/the-first-step-to-recovery-is-admitting-you-are-not-powerless-over-your-privilege-1976a2b1a71a",
  },
  {
    id: 3,
    title: "Gendered Language in 12 Step Programs",
    url: "https://www.thefix.com/gendered-language-12-step-programs/",
  },
  {
    id: 4,
    title: "Why Aren’t There More People of Color in the Recovery Movement?",
    url: "https://www.thefix.com/recovery-movement-lacks-people-of-color/",
  },
  {
    id: 5,
    title:
      "White People Go to Rehab, Black People Go to Jail by Amy Dresner and Joe Schrank",
    url: "https://www.workithealth.com/blog/white-people-go-to-rehab-black-people-go-to-jail/",
  },
  {
    id: 6,
    title: "Native American Sobriety Circles",
    url: "https://www.thefix.com/native-american-sobriety-circles/",
  },
  {
    id: 7,
    title:
      "How Being Black Can Shape Your Recovery Experience by Jocellyn Harvey",
    url: "https://www.thetemper.com/recovering-while-black/",
  },
  {
    id: 8,
    title: "What Audre Lorde Taught Me About Recovery by Waithera Kamau",
    url: "https://www.thetemper.com/what-audre-lorde-taught-me-about-recovery/",
  },
  {
    id: 9,
    title:
      "It’s Time to Examine the Racial Disparity in Addiction Treatment by Mark Goodson",
    url: "https://www.workithealth.com/blog/race-and-addiction/",
  },
  {
    id: 10,
    title: "How to Make Recovery Spaces More Inclusive By Lazarus Letcher",
    url: "https://www.thetemper.com/how-to-make-recovery-spaces-more-inclusive/",
  },
  {
    id: 11,
    title:
      "Where Are All The Black People: Diversity & the Changing Face of Recovery by Greg Liotta",
    url: "https://recoveryview.com/article/where-are-all-the-black-people-diversity-the-changing-face-of-recovery/",
  },
  {
    id: 12,
    title:
      "How To Make Sober Culture More Inclusive and Accessible by Khadi A. Oluwatoyin",
    url: "https://www.thetemper.com/how-to-make-sober-culture-more-inclusive-and-accessible/",
  },
  {
    id: 13,
    title:
      "Parallels Between Under-Served Populations in Alcoholics Anonymous and Secular AA Groups (NO LINK)",
  },
  {
    id: 14,
    title: "Drug Use by Race and Recovery by Ben Lesser",
    url: "https://dualdiagnosis.org/race-recovery",
  },
  {
    id: 15,
    title: "Privilege Lurks at the Heart of Recovery Movements",
    url: "https://www.thefix.com/privilege-recovery-movements/",
  },
  {
    id: 16,
    title:
      "Addiction as a Moral Failing: How a Mexican-American Trans-Man Found His Voice Within the Recovery Community by Emiliano Leal",
    url: "https://medium.com/@emiliano.e.leal/addiction-as-a-moral-failing-how-a-mexican-american-trans-man-found-his-voice-within-the-recovery-d75bafa38223",
  },
];

function Articles() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Articles</h1>
      <p className="subpage-note">
        The following articles are recommended readings related to BIPOC &
        Recovery.
      </p>

      <ul className="links-list">
        {articlesList.map((article) => (
          <li key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
