import "./Books.css";

const booksList = [
  {
    id: 13,
    title: "Afeni Shakur: Evolution of a Revolutionary by Jasmine Guy",
    url: "https://www.amazon.com/Afeni-Shakur-Revolutionary-Jasmine-Guy/dp/0743470540",
  },
  {
    id: 7,
    title:
      "Angel on My Shoulder: An Autobiography by Natalie Cole and Digby Diehl",
    url: "https://www.amazon.com/Angel-Shoulder-Autobiography-Natalie-Cole/dp/0446527467/ref=sr_1_1?ie=UTF8&qid=1545456455&sr=8-1&keywords=natalie+cole+book",
  },
  {
    id: 21,
    title:
      "Behind the Eight Ball: Sex for Crack Cocaine Exchange and Poor Black Women by Tanya Telfair Sharpe",
    url: "https://www.amazon.com/Behind-Eight-Ball-Cocaine-Exchange/dp/0789024578",
  },
  {
    id: 19,
    title:
      "Chemical Dependency and the African American: Counseling and Prevention Strategies by Peter Bell",
    url: "https://www.amazon.com/Chemical-Dependency-African-American-Counseling/dp/1568388810",
  },
  {
    id: 8,
    title:
      "Culturally Specific Treatment: A Model for the Treatment of African-American Clients by Hattie Wash, Psy. D.",
    url: "https://www.amazon.com/Culturally-Specific-Treatment-African-American-Clients/dp/1483483517/ref=sr_1_1?ie=UTF8&qid=1542763319&sr=8-1&keywords=hattie+wash",
  },
  {
    id: 18,
    title:
      "Doin’ Drugs: Patterns of African American Addiction by William H. James and Stephen L. Johnson",
    url: "https://www.amazon.com/Doin-Drugs-Patterns-American-Addiction/dp/0292740417",
  },
  {
    id: 20,
    title: "Dopefiend by Donald Goines",
    url: "https://www.amazon.com/Dopefiend-Donald-Goines/dp/0870679384",
  },
  {
    id: 15,
    title:
      "Dysfunctional by Design: The Rebirth of Cultural Survivors : Self Help for African American Substance Abusers by William P. Green",
    url: "https://www.amazon.com/Dysfunctional-Design-Rebirth-Cultural-Survivors/dp/1886094101",
  },
  {
    id: 5,
    title:
      "Everything You Need to Know about Drugs, Addiction, and Recovery by Henry Abraham (NO LINK)",
  },
  {
    id: 6,
    title:
      "Fetal Alcohol Exposure in the African American Community By Carl C. Bell",
    url: "https://www.amazon.com/Alcohol-Exposure-African-American-Community/dp/0883784076/ref=sr_1_1?keywords=fetal+alcohol+exposure+in+the+african+american+community&qid=1565136051&s=gateway&sr=8-1",
  },
  {
    id: 10,
    title:
      "From Recovery to Discovery: My Journey Through Addiction by Felicia Lee-Sexton",
    url: "https://www.amazon.com/Recovery-Discovery-Journey-Through-Addiction/dp/1979555338/ref=sr_1_1?ie=UTF8&qid=1525014806&sr=8-1&keywords=from+recovery+to+discovery",
  },
  {
    id: 11,
    title:
      "God and Starbucks: An NBA Superstar's Journey Through Addiction and Recovery – An Olympic Medalist's Memoir of Fall and Redemption Through Faith by Vin Baker and Joe Layden",
    url: "https://www.amazon.com/God-Starbucks-Superstars-Addiction-Recovery/dp/0062496816/ref=sr_1_1?ie=UTF88qid=1519317437&sr=8-1&keywords=vin+baker+book",
  },
  {
    id: 12,
    title:
      "Healing Neen: One Woman's Path to Salvation from Trauma and Addiction by Tonier Cain",
    url: "https://www.amazon.com/Healing-Neen-Womans-Salvation-Addiction/dp/0757317960/ref=sr_1_1?oe+UTF8&qid=1519319656&sr=8-1&keywords=healing+neen+books&dpID=51S8iVFqCaL&preST=SY344_BO1,204,203,200_QL70_&dpSrc=srch",
  },
  {
    id: 1,
    title: "Heroes of Early Black AA by Glenn F. Chestnut (FREE)",
    url: "https://static1.squarespace.com/static/571504362b8dde27387fbcf3/t/5a5289d9ec212d62e3010fba/1515358688857/Heroes+of+Early+Black+AA.pdf",
  },
  {
    id: 2,
    title:
      "I'm Black and I'm Sober: The Timeless Story Of A Woman's Journey Back To Sanity by Chaney Allen",
    url: "https://books.google.com/books/about/I_m_Black_and_I_m_Sober.html?id=iU-tm-_CocAC",
  },
  {
    id: 9,
    title: "Life Is Not an Accident: A Memoir of Reinvention by Jay Williams",
    url: "https://www.amazon.com/Life-Not-Accident-Memoir-Reinvention/dp/0062327992/ref=sr_1_1?ieUTF8&qid=1528221461&sr=8-1&keywords=jay+williams",
  },
  {
    id: 17,
    title:
      "Relapse Prevention Counseling Workbook: Practical Exercises for Managing High-Risk Situations by Terence T. Gorski",
    url: "https://www.amazon.com/Relapse-Prevention-Counseling-Workbook-Situations/dp/0830907394",
  },
  {
    id: 4,
    title: "Sisters of the Yam: Black Woman and Self-Recovery by Bell Hooks",
    url: "https://www.amazon.com/Sisters-Yam-Black-Women-Self-Recovery/dp/1138821683",
  },
  {
    id: 16,
    title:
      "Substance Use Disorders in African American Communities by Mark Sanders",
    url: "https://www.amazon.com/Substance-Disorders-African-American-Communtiies/dp/1138954683",
  },
  {
    id: 14,
    title: "The Autobiography of Malcolm X by Malcon X and Haley Alex",
    url: "https://www.amazon.com/Authobiography-Malcolm-Attallah-Shabazz-Hailey/dp/B00193RJEM",
  },
  {
    id: 3,
    title:
      "The Red Road to Wellbriety: In The Native American Way by White Bison",
    url: "https://www.amazon.com/Red-Road-Wellbriety-Native-American/dp/0971990409",
  },
];

function Books() {
  return (
    <div className="page">
      <h1>Books</h1>
      <p className="subpage-note">
        The following books are recommended readings related to BIPOC &
        Recovery.
      </p>

      <ul className="links-list">
        {booksList.map((book) => (
          <li key={book.id}>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
