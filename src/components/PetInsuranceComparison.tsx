import React, { lazy, Suspense } from "react";
import { SectionTitle, SectionDescription, CTAButton, TableCell } from "./common";
import { COST_DATA, PLAN_DETAILS_DATA, USER_OPINION_DATA, CLAIMS_DATA } from "../data/insurance-providers";

// Lazy load the Fold component for better performance
const Fold = lazy(() => import("../screens/Fold/Fold").then(module => ({ default: module.Fold })));

// Interface for component props
interface PetInsuranceComparisonProps {
  onCTAClick?: () => void;
}

// Main component
export const PetInsuranceComparison: React.FC<PetInsuranceComparisonProps> = ({ onCTAClick }) => {
  return (
    <div className="bg-white w-full min-w-[378px] min-h-screen">
      <div className="max-w-[1440px] min-w-[378px] mx-auto px-0 sm:px-6 md:px-8 lg:px-0">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-5">
            <main className="col-span-6 sm:col-span-8 md:col-span-10 lg:col-span-12 flex flex-col items-start gap-8 sm:gap-10 md:gap-12 bg-white py-4 sm:py-6 md:py-0 w-full mx-auto">
            <div className="flex flex-col items-start gap-10 w-full">
              
              {/* Our Analysis Section */}
              <section id="best-value-analysis" className="flex flex-col items-start gap-6 mt-6 pt-10 w-full border-t border-[#CED4DB]">
                <div style={{
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '24px',
                  display: 'inline-flex'
                }}>
                  <div style={{
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '24px',
                    display: 'flex'
                  }}>
                    <div style={{
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: '8px',
                      display: 'flex'
                    }}>
                      <h2 className="text-[32px] sm:text-[32px] md:text-[32px] lg:text-[40px] leading-[39px] sm:leading-[39px] md:leading-[39px] lg:leading-[48px]" style={{color: 'black', fontFamily: 'Schnyder S', fontWeight: 700}}>
                        Our Analysis of the Best Value in Pet Insurance
                      </h2>
                      <div style={{
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: '16px',
                        display: 'flex'
                      }}>
                        <div style={{
                          color: '#333333',
                          fontSize: '18px',
                          fontFamily: 'Georgia',
                          fontWeight: '400',
                          lineHeight: '29.12px',
                          wordWrap: 'break-word'
                        }}>
                          Pets Best's Essential policy offers the most bang for your buck in our analysis of coverage vs. cost. While some policies include more coverage, like Pumpkin and Spot, Pets Best has the highest ratio of coverage compared to cost.
                        </div>
                        <div style={{
                          color: '#333333',
                          fontSize: '18px',
                          fontFamily: 'Georgia',
                          fontWeight: '400',
                          lineHeight: '29.12px',
                          wordWrap: 'break-word'
                        }}>
                          In the graph below, bubbles that float to the top indicate companies with higher costs, and bubbles to the right indicate broader coverage. The Pets Best Essential plan offers the best value in our analysis.
                        </div>
                      </div>
                      <img
                        style={{
                          alignSelf: 'stretch',
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain'
                        }}
                        src="/Chart.png"
                        alt="Pet Insurance Value Analysis Chart"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Pet Insurance Cost Section */}
              <section id="insurance-cost" className="flex flex-col items-start gap-6 mt-6 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <SectionTitle level="h3">Pet Insurance Cost for Dogs and Cats</SectionTitle>
                    <SectionDescription>
                      The table below shows the average monthly cost for the leading pet insurance providers for dogs and cats.
                    </SectionDescription>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed border-separate border-spacing-0 min-w-[800px]">
                    <thead>
                      <tr>
                        <TableCell isHeader className="w-[25%] rounded-tl-[8px] ">Provider</TableCell>
                        <TableCell isHeader className="w-[30%]">Average Monthly for Dogs</TableCell>
                        <TableCell isHeader className="w-[30%]">Average Monthly for Cats</TableCell>
                        <TableCell isHeader className="w-[15%] rounded-tr-[16px]">Apply Now</TableCell>
                      </tr>
                    </thead>
                    <tbody>
                      {COST_DATA.map((row, index) => (
                        <tr key={row.provider}>
                          <TableCell isProvider>{row.provider}</TableCell>
                          <TableCell>{row.dogCost}</TableCell>
                          <TableCell>{row.catCost}</TableCell>
                          <TableCell>
                            <a 
                              href={row.applyNowUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#007ac8] underline hover:text-[#005a8a] transition-colors duration-200"
                            >
                              Apply Now
                            </a>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <CTAButton onClick={onCTAClick} />
              </section>

              {/* Pet Insurance Plan Details Section */}
              <section id="plan-details" className="flex flex-col items-start gap-10 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <SectionTitle level="h3">Pet Insurance Plan Details</SectionTitle>
                    <SectionDescription>
                      Understanding the different coverage options of plans is essential in choosing the best plan for your pet. Here are the most important pet insurance plan information:
                    </SectionDescription>
                  </div>
                </div>
                
                <div className="flex flex-col items-start gap-6 w-full">
                <div className="w-full overflow-x-auto relative">
                  <table className="w-full border-separate border-spacing-0 table-fixed min-w-[1200px] relative">
                    <thead>
                      <tr>
                        <TableCell isHeader className="w-[10%] rounded-tl-[8px] sticky left-0 z-[1] bg-[#ecf1ff]">Provider</TableCell>
                        <TableCell isHeader className="w-[13%]">Age Restrictions</TableCell>
                        <TableCell isHeader className="w-[30%]">Waiting Periods</TableCell>
                        <TableCell isHeader className="w-[12%]">End of Life Expenses</TableCell>
                        <TableCell isHeader className="w-[12%]">Vet Exam Fees</TableCell>
                        <TableCell isHeader className="w-[12%]">Microchipping</TableCell>
                        <TableCell isHeader className="w-[11%] rounded-tr-[16px] overflow-hidden">Apply Now</TableCell>
                      </tr>
                    </thead>
                    <tbody>
                      {PLAN_DETAILS_DATA.map((row) => (
                        <tr key={row.provider}>
                          <TableCell isProvider className="align-top sticky left-0 z-[1] bg-white">{row.provider}</TableCell>
                          <TableCell className="align-top">{row.ageRestrictions}</TableCell>
                          <TableCell className="align-top">{row.waitingPeriods}</TableCell>
                          <TableCell className="align-top">{row.endOfLife}</TableCell>
                          <TableCell className="align-top">{row.vetExamFees}</TableCell>
                          <TableCell className="align-top">{row.microchipping}</TableCell>
                          <TableCell className="align-top">
                            <a 
                              href={row.applyNowUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#007ac8] underline hover:text-[#005a8a] transition-colors duration-200"
                            >
                              Apply Now
                            </a>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  
                  <CTAButton onClick={onCTAClick} />
                </div>
              </section>

              {/* User Opinion Section */}
              <section id="user-opinion" className="flex flex-col items-start gap-6 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <SectionTitle level="h3">User Opinion of Pet Insurance Companies</SectionTitle>
                    <SectionDescription>
                      Forbes Advisor collects user sentiment both directly through NPS surveys and indirectly by collecting user feedback across the internet using the Consumer Sentiment Index (CSI). This is how real users described their opinion of leading pet insurance companies:
                    </SectionDescription>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto relative">
                  <table className="w-full table-fixed border-separate border-spacing-0 min-w-[1000px] relative">
                    <thead>
                      <tr>
                        <TableCell isHeader className="w-[15%] rounded-tl-[8px] sticky left-0 z-[1] bg-[#ecf1ff]">Provider</TableCell>
                        <TableCell isHeader className="w-[12%]">CSI Rating</TableCell>
                        <TableCell isHeader className="w-[18%]">How Likely to Recommend</TableCell>
                        <TableCell isHeader className="w-[22%]">Common Positive Sentiments</TableCell>
                        <TableCell isHeader className="w-[22%]">Common Negative Sentiments</TableCell>
                        <TableCell isHeader className="w-[11%] rounded-tr-[8px]">Apply Now</TableCell>
                      </tr>
                    </thead>
                    <tbody>
                      {USER_OPINION_DATA.map((row) => (
                        <tr key={row.provider}>
                          <TableCell isProvider className="sticky left-0 z-[1] bg-white">{row.provider}</TableCell>
                          <TableCell className="font-bold">{row.csiRating}</TableCell>
                          <TableCell>{row.likelyToRecommend}</TableCell>
                          <TableCell>{row.positiveComments}</TableCell>
                          <TableCell>{row.negativeComments}</TableCell>
                          <TableCell>
                            <a 
                              href={row.applyNowUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#007ac8] underline hover:text-[#005a8a] transition-colors duration-200"
                            >
                              Apply Now
                            </a>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <CTAButton onClick={onCTAClick} />
              </section>

              {/* Claims Process Section */}
              <section id="claims-feedback" className="flex flex-col items-start gap-6 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <SectionTitle level="h3">User Feedback on Claims Process</SectionTitle>
                    <SectionDescription>
                      Forbes Advisor surveyed users of each pet insurance company to get feedback on the claims process. This table displays real pet insurance user opinion of claims over a 12 month period from 2023 to 2024.
                    </SectionDescription>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto relative">
                  <table className="w-full table-fixed border-separate border-spacing-0 min-w-[800px] relative">
                    <thead>
                      <tr>
                        <TableCell isHeader className="w-[25%] rounded-tl-[8px] sticky left-0 z-[1] bg-[#ecf1ff]">Provider</TableCell>
                        <TableCell isHeader className="w-[30%]">Satisfaction with Claims</TableCell>
                        <TableCell isHeader className="w-[30%]">Overall Satisfaction</TableCell>
                        <TableCell isHeader className="w-[15%] rounded-tr-[16px]">Apply Now</TableCell>
                      </tr>
                    </thead>
                    <tbody>
                      {CLAIMS_DATA.map((row) => (
                        <tr key={row.provider}>
                          <TableCell isProvider className="sticky left-0 z-[1] bg-white">{row.provider}</TableCell>
                          <TableCell>{row.claimsSatisfaction}</TableCell>
                          <TableCell>{row.overallSatisfaction}</TableCell>
                          <TableCell>
                            <a 
                              href={row.applyNowUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#007ac8] underline hover:text-[#005a8a] transition-colors duration-200"
                            >
                              Apply Now
                            </a>
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <CTAButton onClick={onCTAClick} />
              </section>

              {/* How to Choose the Right Pet Insurance Section */}
              <section id="how-to-choose" className="flex flex-col items-start gap-6 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <h2 className="text-black text-[32px] sm:text-[32px] md:text-[32px] lg:text-[40px] font-bold leading-[39px] sm:leading-[39px] md:leading-[39px] lg:leading-[48px]" style={{ fontFamily: 'Schnyder S', fontWeight: 700 }}>
                      How to Choose the Right Pet Insurance
                    </h2>
                    <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                      These simple steps will get you to the best policy for your situation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-8 w-full">
                  {/* Consider Your Pet's Potential Health Problems */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 26.667v-6.667m0-6.667h.017M36.667 20c0 9.205-7.462 16.667-16.667 16.667S3.333 29.205 3.333 20 10.795 3.333 20 3.333 36.667 10.795 36.667 20z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Consider Your Pet's Potential Health Problems
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        Your pet's age, breed and health history can affect what kind of coverage you want. Consult with your vet about your pet's susceptibility to certain illnesses or injuries common to the breed. Also, consider the pet's risk of injury if they spend a lot of time outdoors.
                      </p>
                    </div>
                  </div>

                  {/* Determine What Policy Features Are Important to You */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M35 20c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C5 11.716 11.716 5 20 5c8.284 0 15 6.716 15 15z" stroke="white" strokeWidth="2"/>
                          <path d="M25 17.5l-6.667 6.667L15 20.833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Determine What Policy Features Are Important to You
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        Consider what types of health issues should be covered by your ideal policy, especially when it comes to potentially pricey problems. For example, if you want coverage for serious illnesses such as cancer, make sure you buy an accident and illness policy rather than an accident-only policy.
                      </p>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        It's also a smart idea to look for coverage perks like a 24/7 pet telehealth line, coverage for vet exam fees and the option to add a wellness plan.
                      </p>
                    </div>
                  </div>

                  {/* Consider the Waiting Periods */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 10v10l6.667 3.333M36.667 20c0 9.205-7.462 16.667-16.667 16.667S3.333 29.205 3.333 20 10.795 3.333 20 3.333 36.667 10.795 36.667 20z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Consider the Waiting Periods
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        Pet insurance waiting periods are generally two to 14 days for accident coverage and 14 days for illness coverage. Some pet insurers have special waiting periods for orthopedic conditions (such as cruciate ligament issues) that can range from six to 12 months. You can find pet insurance with no special waiting periods, such as <a href="#" className="text-[#007AC8] underline hover:text-[#005a8a] transition-colors">ASPCA pet health insurance</a>.
                      </p>
                    </div>
                  </div>

                  {/* Choose Reimbursement Levels */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 36.667c9.205 0 16.667-7.462 16.667-16.667S29.205 3.333 20 3.333 3.333 10.795 3.333 20 10.795 36.667 20 36.667z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 13.333V20m0 6.667h.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Choose Reimbursement Levels
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        Your coverage levels will impact your pet insurance cost. If you want to pay less out of pocket, choose a lower deductible and a higher reimbursement amount, but it'll cost you more in premiums because your insurer will pay out more if you file a pet insurance claim.
                      </p>
                    </div>
                  </div>

                  {/* Check Your Pet's Eligibility */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.333 20L18.333 25l8.334-10m5 5c0 9.205-7.462 16.667-16.667 16.667S3.333 29.205 3.333 20 10.795 3.333 20 3.333 36.667 10.795 36.667 20z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Check Your Pet's Eligibility
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        Some pet insurers have age limits to buy a policy. Most insurers will insure puppies and kittens around the age of six to 10 weeks. But some insurers have upper age limits (such as age 14) to buy a policy. The <a href="#" className="text-[#007AC8] underline hover:text-[#005a8a] transition-colors">best pet insurance companies for older dogs</a> do not have upper age limits and have convenient coverage perks like a 24/7 pet telehealth line and the option to add a wellness plan.
                      </p>
                    </div>
                  </div>

                  {/* Compare Quotes for Plans That Match Your Wish List */}
                  <div className="w-full bg-[#f6f8fa] rounded-lg p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#203468] rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M33.333 5H6.667C5.747 5 5 5.746 5 6.667v26.666C5 34.254 5.747 35 6.667 35h26.666c.92 0 1.667-.746 1.667-1.667V6.667C35 5.746 34.253 5 33.333 5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M25 5v30M11.667 13.333h6.666m-6.666 6.667h6.666m-6.666 6.667h6.666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-black text-xl font-bold leading-[26px]" style={{ fontFamily: 'Schnyder S' }}>
                        Compare Quotes for Plans That Match Your Wish List
                      </h3>
                      <p className="text-[#333333] text-[18px] leading-[29.12px] font-normal tracking-[0]" style={{ fontFamily: 'Georgia' }}>
                        The best way to find a policy within your budget is to <a href="#" className="text-[#007AC8] underline hover:text-[#005a8a] transition-colors">compare pet insurance quotes</a> from multiple insurers. Make sure to compare quotes for various levels of annual coverage. In some cases you can pay a little more per month for a lot more coverage. For example, unlimited annual coverage from Pets Best is only about $6 more per month than its $5,000 limit plan. This is a bargain compared to other pet insurers, where the monthly price difference can be more like $30 and up.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Sections */}
                <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 40, display: 'inline-flex'}}>
                  {/* Compare Plans Available By Company */}
                  <div style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                          <div style={{alignSelf: 'stretch', color: '#333333', fontSize: 24, fontFamily: 'Work Sans', fontWeight: '700', lineHeight: '29px', wordWrap: 'break-word'}}>Compare Plans Available By Company</div>
                          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              If you're shopping for pet insurance, the first thing we recommend looking at is the plan type. We recommend a comprehensive pet insurance policy that covers accidents and illnesses. The three main types of pet insurance can generally be broken down to:
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Accident and illness plan. This covers vet bills for accidents (like broken bones) and illnesses (such as cancer, allergies and skin infections).
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Accident-only plan. This covers accident-related vet expenses, such as broken bones, bite wounds and ingested foreign objects. It does not cover illness-related vet expenses.
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Pet wellness plans for routine care. This is typically an add-on policy that covers routine vet expenses like annual wellness exams, flea and heartworm prevention and vaccinations.
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              You might also see the term "comprehensive plan" when you're shopping for pet insurance. This typically refers to an accident and illness policy plus an optional wellness plan. This is sometimes referred to as a "nose to tail" policy.
                            </div>
                            <div>
                              <span style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>Related: </span>
                              <span style={{color: '#007AC8', fontSize: 18, fontFamily: 'Georgia', fontWeight: '700', textDecoration: 'underline', lineHeight: '29.12px', wordWrap: 'break-word'}}>What Does Pet Insurance Cover?</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Levels */}
                  <div style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                          <div style={{alignSelf: 'stretch', color: '#333333', fontSize: 24, fontFamily: 'Work Sans', fontWeight: '700', lineHeight: '29px', wordWrap: 'break-word'}}>Coverage Levels</div>
                          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Pet insurance policies will typically offer a range of annual maximums, deductibles and reimbursement levels to choose from. We would prioritize choosing coverage levels you're comfortable with rather than focusing on price alone. In the event of an expensive claim, you'll be glad you bought sufficient coverage.
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Annual maximum coverage. This is the maximum amount that will be paid out for pet insurance claims during the policy period. Common annual maximum coverage amounts include $5,000, $10,000 and unlimited.
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Deductible. This is the amount you'll pay toward vet bills before your coverage kicks in. Common deductible choices include $100, $250 and $500.
                            </div>
                            <div style={{color: '#333333', fontSize: 18, fontFamily: 'Georgia', fontWeight: '400', lineHeight: '29.12px', wordWrap: 'break-word'}}>
                              Reimbursement percentage. This is the reimbursement you'll get back if you make a pet insurance claim. Common reimbursement levels include 70%, 80% and 90%.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Methodology and Evaluation Section */}
              <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <Fold />
              </Suspense>

              {/* FAQ Section */}
              <section id="faq" className="flex flex-col items-start gap-6 pt-10 w-full border-t border-[#CED4DB]">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <SectionTitle level="h2">Frequently Asked Questions</SectionTitle>
                    <SectionDescription>
                      Common questions about pet insurance coverage, costs, and claims process.
                    </SectionDescription>
                  </div>
                </div>
                
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="w-full p-6 bg-[#f8f9fa] rounded-lg">
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Does pet insurance cover both dogs and cats under the same plan?
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                      Most pet insurance providers require separate policies for each pet, regardless of species. However, many offer multi-pet discounts when you insure multiple pets with the same company.
                    </p>
                  </div>
                  
                  <div className="w-full p-6 bg-[#f8f9fa] rounded-lg">
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Does pet insurance cover vaccinations and annual checkups?
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                      Basic pet insurance typically covers accidents and illnesses but not routine care. However, many providers offer wellness add-ons that cover vaccinations, annual exams, and preventive care for an additional cost.
                    </p>
                  </div>
                  
                  <div className="w-full p-6 bg-[#f8f9fa] rounded-lg">
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Work Sans' }}>
                      Are pre-existing conditions covered?
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                      No, pet insurance does not cover pre-existing conditions. Any health issue your pet has before coverage begins or during waiting periods will be excluded from coverage permanently.
                    </p>
                  </div>
                  
                  <div className="w-full p-6 bg-[#f8f9fa] rounded-lg">
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Work Sans' }}>
                      How are premiums calculated for pet insurance?
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Work Sans' }}>
                      Premiums are based on your pet's age, breed, location, coverage level, deductible amount, and reimbursement percentage. Older pets and certain breeds prone to health issues typically cost more to insure.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};