import img1 from "../assets/images/quizpic1.png";
import img2 from "../assets/images/quizpic2.png";
import img3 from "../assets/images/quizpic3.png";

export const portfolioquestion = [
  {
    instruction:
      "We are digital platforms that provide automated, algorithm-driven financial planning services with little to no human supervision. A typicaly we collects information from clients about their financial situation and future goals through an online survey and then uses the data to offer advice and automatically suggest best investment assets.",
    imgurl: img1,
  },
  {
    instruction:
      "This questionnaire was developed to help you understand yourself. This Questionnaire has 10 questions that are divided in two sections: Understanding your Risk Capacity and Understanding your own Tolerance to Risk",
    imgurl: img2,
  },
  {
    instruction:
      "After we gauge these two elements, we will be able to measure the results and cross-reference what your true Risk Profile is. This will not only help us get a better understanding of your financial goals but what road to take to get there.",
    imgurl: img3,
  },
  {
    question: "1. What is your current age?",
    o1: "More than 60",
    o2: "Between 51 and 60",
    o3: "Between 41 and 50",
    o4: "Between 31 and 40",
    o5: "30 or Younger",
    type: "risk-capacity",
  },
  {
    question:
      "2. Please estimate when you will need to withdraw 20% of your current portfolio value, such as a need for a house down payment or some other major financial need?",
    o1: " Within the next year ",
    o2: " 2 – 5 Years from now ",
    o3: " 5 – 10 Years from now ",
    o4: " 10 – 20 Years from now ",
    o5: " More than 20 Years from now ",
    type: "risk-capacity",
  },
  {
    question:
      "3. If you were to lose your job today, how long will you be able to maintain your current spending life style before you run out of money in your Savings and Checking account?",
    o1: " 1 Week ",
    o2: " 1 Month ",
    o3: " 3 Months ",
    o4: " 6 Months ",
    o5: " 1 Year or More ",
    type: "risk-capacity",
  },
  {
    question: "4. What is your total annual income?",
    o1: " Less than 5,00,000 ",
    o2: " 5,00,000 – 10,00,000 ",
    o3: " 10,00,000 – 15,00,000 ",
    o4: " 15,00,000 – 25,00,000 ",
    o5: " More than 25,00,000 ",
    type: "risk-capacity",
  },
  {
    question: "5. Please rate the stability of your income.",
    o1: " Very Low ",
    o2: " Below Average ",
    o3: " Average ",
    o4: " Above Average ",
    o5: " Very High ",
    type: "risk-capacity",
  },
  {
    question:
      "6. If you unexpectedly received 10,00,000 to invest today, what would you do?",
    o1: " Deposit it in a bank account, money market account, or an insured CD. ",
    o2: " Invest only in safe quality bonds or bond funds. ",
    o3: " Invest in a proper mix of bonds and stocks ",
    o4: " Invest only in stocks or stock funds ",
    o5: " Buy 10,00,000 worth of lottery tickets. ",
    type: "risk-tolerance",
  },
  {
    question:
      "7. When you think of the word “risk” in a financial context, which of the following words come to mind?",
    o1: " Absolute Loss ",
    o2: " Danger ",
    o3: " Uncertainty ",
    o4: " Opportunity ",
    o5: " Thrill ",
    type: "risk-tolerance",
  },
  {
    question:
      "8. Which of these statements would best describe your attitudes about the next three years performance of this investment?",
    o1: " I need to see at least a little return ",
    o2: " I’d have a hard time tolerating any losses ",
    o3: "  I can tolerate a small loss ",
    o4: " I can tolerate a loss ",
    o5: " I don’t mind a loss ",
    type: "risk-tolerance",
  },
  {
    question:
      "9. Throughout the few-month bear during the 2020 Covid-19 Crisis, the NIFTY lost 35% of its value. Which of the following would you have done if your portfolio experiences a 50% loss?",
    o1: " Sell all of your remaining investments and remain in cash ",
    o2: " Move all of your investments into Bonds and CDs ",
    o3: " Change the allocation of your portfolio to something more conservative ",
    o4: " Hold on to your investment ",
    o5: " Invest more ",
    type: "risk-tolerance",
  },
  {
    question: "10. How emotionally comfortable are you with volatility?",
    info: "Which the following portfolios are you more comfortable with given the best-case and worst-case annual return?",
    tabledata: [
      {
        plan: "A",
        "best-case": "16.1%",
        "worst-case": "-5.4%",
        "average annual return": "7.0%",
      },
      {
        plan: "B",
        "best-case": "24.8%",
        "worst-case": "-11.9%",
        "average annual return": "8.8%",
      },
      {
        plan: "C",
        "best-case": "33.4%",
        "worst-case": "-18.0%",
        "average annual return": "10.2%",
      },
      {
        plan: "D",
        "best-case": "42.6%",
        "worst-case": "-23.8%",
        "average annual return": "11.5%",
      },
      {
        plan: "E",
        "best-case": "50.0%",
        "worst-case": "-28.2%",
        "average annual return": "12.3%",
      },
    ],
    o1: " Portfolio A ",
    o2: " Portfolio B ",
    o3: " Portfolio C ",
    o4: " Portfolio D ",
    o5: " Portfolio E  ",
    type: "risk-tolerance",
  },
];

export const portfolioResults = [
  {
    status: "Very Conservative",
    color: "#7ECF82",
    desc: "As a very conservative investor, your portfolio will be invested in the most risk-averse areas such as cash and fixed income securities. This approach offers a high degree of stability and should minimize the chances of substantial short-term volatility. Your main goal is preservation of wealth. The overall return, while not guaranteed, should fall within a narrow range of possibilities. However, particularly for time periods greater than five years, these returns may underperform the returns achievable from a higher-risk approach",
  },
  {
    status: "Conservative",
    color: "#7ECF82",
    desc: "As a conservative investor, your portfolio will be invested primarily in risk-averse areas such as cash and fixed-income securities with only a modest exposure to equities. This approach concentrates on stability rather than maximizing return and should limit the chances of substantial short-term volatility. The overall return, while not guaranteed, should fall within a relatively narrow range of possibilities. However, particularly for time periods greater than five years, these returns may underperform the returns achievable from a higher-risk approach",
  },
  {
    status: "Moderate",
    color: "#ffdf00",
    desc: "As a moderate investor, your portfolio will include investment in equities, balanced by exposure to more risk-averse areas of the market such as cash, fixed-income securities, and real estate. This approach aims to achieve a balance between stability and return but is likely to involve at least some short-term volatility. The overall return is not guaranteed, although the range of possible outcomes should not be extreme. In most circumstances, particularly for time periods greater than five years, these returns should outperform the returns achievable from a more conservative approach but may underperform the returns achievable from a higher-risk approach",
  },
  {
    status: "Aggressive",
    color: "#F2AF33",
    desc: "As an moderately aggressive investor, your portfolio will be invested primarily in equities. This approach concentrates on achieving a good overall return on your investment while avoiding the most speculative areas of the market. Significant short-term fluctuations in value can be expected. The eventual return for the time period over which you invest could fall within a relatively wide range of possibilities. In most circumstances, particularly for time periods greater than five years, these returns should outperform the returns achievable from a more conservative approach",
  },
  {
    status: "Very Aggressive",
    color: "#F55050",
    desc: "As a very aggressive investor, your portfolio will be invested in equities and will include exposure to more speculative areas of the market. The aim is to maximize return while accepting the possibility of large short-term fluctuations in value and even the possibility of longer-term losses. The eventual return for the time period over which you invest could fall within a wide range of possibilities. In most circumstances, the return should outperform the returns achievable from a more conservative approach",
  },
];
