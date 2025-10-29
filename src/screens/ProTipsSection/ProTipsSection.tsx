import React, { useState } from "react";

interface Expert {
  name: string;
  title: string;
  avatar: string;
}

interface ProTip {
  title: string;
  content: string;
  expert: Expert;
}

const experts: Expert[] = [
  {
    name: "Dr. Maya Chen, DVM",
    title: "Emergency Veterinarian",
    avatar: "https://placehold.co/40x40"
  },
  {
    name: "Dr. Sarah Mitchell, DVM",
    title: "Small Animal Specialist",
    avatar: "https://placehold.co/40x40"
  },
  {
    name: "Dr. James Rodriguez, DVM",
    title: "Veterinary Consultant",
    avatar: "https://placehold.co/40x40"
  }
];

const proTips: ProTip[] = [
  {
    title: "Enroll before symptoms",
    content: "Waiting periods (e.g., 1–14 days) and pre-existing clauses mean issues noted in records may be excluded later.",
    expert: experts[0]
  },
  {
    title: "Compare deductibles carefully",
    content: "Lower monthly premiums often come with higher deductibles. Choose based on your financial comfort level for emergencies.",
    expert: experts[1]
  },
  {
    title: "Read the fine print on coverage",
    content: "Some plans exclude hereditary conditions or specific treatments. Make sure your pet's breed-specific risks are covered.",
    expert: experts[2]
  }
];

export const ProTipsSection = (): JSX.Element => {
  const [selectedTipIndex, setSelectedTipIndex] = useState(0);
  const currentTip = proTips[selectedTipIndex];

  return (
    <div id="pro-tips" className="w-full">
      <div style={{
          width: '100%',
          padding: '24px',
          background: '#F8F8FA',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '8px',
          display: 'inline-flex',
          borderRadius: '16px'
        }}>
          <div style={{
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '20px',
            display: 'flex'
          }}>
            {/* Title */}
            <div style={{
              alignSelf: 'stretch',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              color: 'black',
              fontSize: '40px',
              fontFamily: 'Schnyder S',
              fontWeight: '700',
              lineHeight: '48px',
              wordWrap: 'break-word'
            }}>
              Pro Tips From Our Experts
            </div>

            {/* Content Area */}
            <div style={{
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              {/* Experts List */}
              <div style={{
                flex: '1',
                minWidth: '200px',
                maxWidth: '216px',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '16px',
                display: 'inline-flex'
              }}>
                {experts.map((expert, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTipIndex(index)}
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '12px',
                      display: 'inline-flex',
                      cursor: 'pointer',
                      opacity: selectedTipIndex === index ? 1 : 0.6,
                      transition: 'opacity 0.2s ease'
                    }}
                  >
                    <img
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '24px',
                        objectFit: 'cover'
                      }}
                      src={expert.avatar}
                      alt={expert.name}
                    />
                    <div style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      display: 'inline-flex'
                    }}>
                      <div style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '2px',
                        display: 'inline-flex'
                      }}>
                        <div style={{
                          color: '#333333',
                          fontSize: '14px',
                          fontFamily: 'Work Sans',
                          fontWeight: '600',
                          textDecoration: 'underline',
                          lineHeight: '19.60px',
                          wordWrap: 'break-word'
                        }}>
                          {expert.name}
                        </div>
                      </div>
                      <div style={{
                        color: '#333333',
                        fontSize: '12px',
                        fontFamily: 'Work Sans',
                        fontWeight: '400',
                        lineHeight: '16px',
                        wordWrap: 'break-word'
                      }}>
                        {expert.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip Content Card */}
              <div style={{
                flex: '2',
                minWidth: 'min(300px, 100%)',
                minHeight: '226px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'white',
                borderRadius: '12px',
                padding: '21px 19px'
              }}>
                <div>
                  <div style={{
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'black',
                    fontSize: '20px',
                    fontFamily: 'Work Sans',
                    fontWeight: '600',
                    lineHeight: '26px',
                    wordWrap: 'break-word',
                    marginBottom: '12px'
                  }}>
                    {currentTip.title}
                  </div>

                  <div style={{
                    color: '#606F7F',
                    fontSize: '16px',
                    fontFamily: 'Work Sans',
                    fontWeight: '400',
                    lineHeight: '24px',
                    wordWrap: 'break-word'
                  }}>
                    {currentTip.content}
                  </div>
                </div>

                {/* Expert Attribution */}
                <div style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '12px',
                  display: 'inline-flex',
                  marginTop: '20px'
                }}>
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '24px',
                      objectFit: 'cover'
                    }}
                    src={currentTip.expert.avatar}
                    alt={currentTip.expert.name}
                  />
                  <div style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    display: 'inline-flex'
                  }}>
                    <div style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '2px',
                      display: 'inline-flex'
                    }}>
                      <div style={{
                        color: '#333333',
                        fontSize: '14px',
                        fontFamily: 'Work Sans',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        lineHeight: '19.60px',
                        wordWrap: 'break-word'
                      }}>
                        {currentTip.expert.name}
                      </div>
                    </div>
                    <div style={{
                      color: '#333333',
                      fontSize: '12px',
                      fontFamily: 'Work Sans',
                      fontWeight: '400',
                      lineHeight: '16px',
                      wordWrap: 'break-word'
                    }}>
                      {currentTip.expert.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

