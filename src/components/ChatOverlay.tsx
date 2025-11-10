// src/components/ChatOverlay.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import {
  InsurancePlan,
  CostData,
  PlanDetails,
  UserOpinion,
  ClaimsData
} from '../data/insurance-providers';

interface Message {
  id: string;
  type: 'bot' | 'user' | 'table';
  text: string;
  options?: ConversationQuestion;
  timestamp: Date;
  isTyping?: boolean;
  tableData?: any;
  showOptions?: boolean;
  onComplete?: () => void;
}

interface ConversationQuestion {
  id: string;
  text: string;
  type: 'buttons';
  options: string[];
  field: 'petType' | 'budget' | 'priority' | 'coverageType';
}

export interface UserPreferences {
  petType?: string;
  budget?: string;
  priority?: string;
  coverageType?: string;
}

export interface ProviderRecommendation {
  provider: string;
  score: number;
  matchReasons: string[];
  costData?: CostData;
  planDetails?: PlanDetails;
  userOpinion?: UserOpinion;
  claimsData?: ClaimsData;
  plan?: InsurancePlan;
}

interface ParsedResponse {
  extracted_value: string;
  confidence: 'high' | 'medium' | 'low';
}

interface ChatOverlayProps {
  plans: InsurancePlan[];
  costData: CostData[];
  planDetails: PlanDetails[];
  userOpinions: UserOpinion[];
  claimsData: ClaimsData[];
  onRecommendations?: (recommendations: ProviderRecommendation[], preferences: UserPreferences) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const CONVERSATION_FLOW: ConversationQuestion[] = [
  {
    id: 'pet-type',
    text: "What type of pet do you have?",
    type: 'buttons',
    options: ['Dog', 'Cat', 'Both'],
    field: 'petType'
  },
  {
    id: 'budget',
    text: "What's your monthly budget per pet?",
    type: 'buttons',
    options: ['Under $40', '$40-60', '$60-80', '$80+'],
    field: 'budget'
  },
  {
    id: 'priority',
    text: "What matters most to you?",
    type: 'buttons',
    options: ['Lowest Price', 'Best Coverage', 'Customer Satisfaction', 'Fast Claims'],
    field: 'priority'
  },
  {
    id: 'coverage-type',
    text: "What type of coverage do you need?",
    type: 'buttons',
    options: ['Accident Only', 'Accident & Illness', 'Comprehensive with Wellness'],
    field: 'coverageType'
  }
];

export const ChatOverlay: React.FC<ChatOverlayProps> = ({
  plans,
  costData,
  planDetails,
  userOpinions,
  claimsData,
  onRecommendations,
  isOpen = false,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isChatInitialized, setIsChatInitialized] = useState(false); // Prevent double initialization
  const initializingRef = useRef(false); // Track if initialization is in progress
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToNewest = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToNewest();
  }, [messages]);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && !isChatInitialized && messages.length === 0 && !initializingRef.current) {
      initializingRef.current = true;
      setIsChatInitialized(true);
      const timer = setTimeout(() => {
        addBotMessageWithDelay(
          "Hi! 👋 I'll help you find the perfect pet insurance provider. Let's get started!", 
          undefined, 
          true, 
          () => {
            // Wait briefly before asking first question
            setTimeout(() => askNextQuestion(), 600);
          }
        );
      }, 300);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, isChatInitialized, messages.length]);

  // Typing effect component
  const TypingText: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ 
    text, 
    speed = 30, 
    onComplete 
  }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const completedRef = useRef(false);
    const onCompleteRef = useRef(onComplete);

    // Update ref when onComplete changes
    useEffect(() => {
      onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else if (currentIndex === text.length && !completedRef.current) {
        completedRef.current = true;
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, [currentIndex, text, speed]);

    return <span>{displayedText}</span>;
  };

  const calculateTypingDelay = (text: string) => {
    return text.length * 20 + 500; // 20ms per character + 500ms buffer
  };

  const addBotMessage = (text: string, options?: ConversationQuestion, withTyping: boolean = true, onComplete?: () => void) => {
    const messageId = `bot-${Date.now()}-${Math.random()}`;
    
    if (withTyping) {
      setIsTypingActive(true);
      // Add message with typing state
      setMessages(prev => [...prev, {
        id: messageId,
        type: 'bot',
        text,
        options,
        timestamp: new Date(),
        isTyping: true,
        showOptions: false,
        onComplete // Store callback in message
      }]);
      setTypingMessageId(messageId);
    } else {
      // Add message immediately without typing, with options shown
      setMessages(prev => [...prev, {
        id: messageId,
        type: 'bot',
        text,
        options,
        timestamp: new Date(),
        isTyping: false,
        showOptions: true // Show options immediately when not typing
      }]);
      
      // Call callback immediately for non-typing messages
      if (onComplete) {
        setTimeout(onComplete, 300);
      }
    }
  };

  const addBotMessageWithDelay = (text: string, options?: ConversationQuestion, withTyping: boolean = true, callback?: () => void) => {
    addBotMessage(text, options, withTyping, callback);
  };

  const handleTypingComplete = (messageId: string) => {
    setTypingMessageId(null);
    setIsTypingActive(false);
    
    // Get the callback from the current state and update message in one go
    setMessages(prev => {
      const messageIndex = prev.findIndex(m => m.id === messageId);
      if (messageIndex === -1) {
        return prev;
      }
      
      const message = prev[messageIndex];
      const callback = message?.onComplete;
      
      // Update the message to mark typing as complete and show options immediately
      const updatedMessages = prev.map((msg) => 
        msg.id === messageId ? { ...msg, isTyping: false, showOptions: true, onComplete: undefined } : msg
      );
      
      // Call the callback after typing completes (with a small delay for options to show)
      if (callback) {
        setTimeout(() => {
          callback();
        }, 400);
      }
      
      return updatedMessages;
    });
  };


  const addUserMessage = (text: string) => {
    const messageId = `user-${Date.now()}-${Math.random()}`;
    setMessages(prev => [...prev, {
      id: messageId,
      type: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const addTableMessage = (recommendations: any[]) => {
    const messageId = `table-${Date.now()}-${Math.random()}`;
    setMessages(prev => [...prev, {
      id: messageId,
      type: 'table',
      text: '',
      timestamp: new Date(),
      tableData: recommendations,
      isTyping: false
    }]);
  };

  const askNextQuestion = (questionIndex?: number, prefsToCheck?: UserPreferences) => {
    const index = questionIndex !== undefined ? questionIndex : currentQuestionIndex;
    const prefs = prefsToCheck || userPreferences;
    
    if (index < CONVERSATION_FLOW.length) {
      const question = CONVERSATION_FLOW[index];
      
      // Check if this question has already been answered via prompt
      if (prefs[question.field]) {
        // Skip this question and move to the next one
        const nextIndex = index + 1;
        setCurrentQuestionIndex(nextIndex);
        if (nextIndex < CONVERSATION_FLOW.length) {
          setTimeout(() => askNextQuestion(nextIndex, prefs), 500);
        } else {
          showResults();
        }
      } else {
        // Ask the question normally
        addBotMessage(question.text, question);
      }
    } else {
      showResults();
    }
  };

  const getAcknowledgmentMessage = (option: string, field: string): string => {
    const lowerOption = option.toLowerCase();
    
    switch (field) {
      case 'petType':
        if (lowerOption.includes('dog')) {
          return "Great choice! Dogs are wonderful companions. In our analysis, dog owners typically spend 15-20% more on pet insurance due to higher injury rates from their active lifestyles. This makes choosing the right coverage even more important.";
        }
        if (lowerOption.includes('cat')) {
          return "Perfect! Cats make amazing pets. While cats generally have lower premium costs, they're prone to specific conditions like kidney disease and dental issues as they age. Indoor cats especially benefit from comprehensive coverage.";
        }
        if (lowerOption.includes('both')) {
          return "Awesome! Multiple pets can be such a joy. We recommend looking for multi-pet discounts, which can save you 5-10% per additional pet. Many families find the savings significant when covering 2+ animals.";
        }
        return "Got it! Our data shows that regardless of pet type, early enrollment (before age 2) typically results in 25-30% lower lifetime premiums.";
      
      case 'budget':
        if (lowerOption.includes('under') || lowerOption.includes('$50')) {
          return "Understood! Budget-friendly options are important. We often recommend that pet owners budget 1-3% of their income for pet insurance. At this price point, accident-only plans can provide essential protection against major emergencies like broken bones or ingested objects.";
        }
        if (lowerOption.includes('$50-$100')) {
          return "Perfect! That's a solid mid-range budget. Our analysis shows this range typically covers comprehensive accident + illness plans with 80% reimbursement rates. This is often the 'sweet spot' where you get excellent value without overpaying.";
        }
        if (lowerOption.includes('over') || lowerOption.includes('$100')) {
          return "Great! With that budget, you'll have excellent options. This range is ideal for pet parents who want premium features like wellness coverage, higher reimbursement rates (90%+), and lower deductibles. You can afford the top-tier plans from leading providers.";
        }
        return "Thanks! Monthly premiums vary significantly by region, breed, and age. The key is finding coverage that fits your financial comfort zone while protecting against major expenses.";
      
      case 'priority':
        if (lowerOption.includes('lowest price')) {
          return "Smart approach! Finding affordable coverage is key. We consistently advise that the cheapest plan isn't always the best value—look for plans with reasonable deductibles and no annual caps. A slightly higher premium can save thousands if your pet needs major treatment.";
        }
        if (lowerOption.includes('best coverage')) {
          return "Excellent choice! Comprehensive protection is valuable. The best coverage typically includes hereditary conditions, alternative therapies, and behavioral treatments. We recommend plans covering 80-90% of eligible expenses with annual limits of $10K+.";
        }
        if (lowerOption.includes('fastest claims')) {
          return "That's important! Quick claims processing makes a difference. The fastest providers process claims in 2-5 business days, with some offering direct pay to vets. This can be crucial during emergencies when you need immediate care approval.";
        }
        return "Perfect! Balancing cost, coverage, and service quality leads to the highest customer satisfaction. We recommend prioritizing based on your pet's specific needs and your financial situation.";
      
      case 'coverageType':
        if (lowerOption.includes('accident only')) {
          return "Got it! Accident-only plans can be very cost-effective. These plans are ideal for young, healthy pets and budget-conscious owners. They typically cover emergencies like broken bones, cuts, and toxic ingestion—which can cost $3,000-$15,000+ without insurance.";
        }
        if (lowerOption.includes('accident + illness')) {
          return "Perfect! That's the most popular coverage combination. This covers about 80-85% of veterinary expenses pet owners face. We particularly recommend this for breeds prone to genetic conditions, as treatment can cost $5,000-$20,000+ annually.";
        }
        if (lowerOption.includes('comprehensive')) {
          return "Excellent! Comprehensive coverage gives you peace of mind. Adding wellness coverage pays for itself if you're diligent about preventive care. Plans covering routine exams, vaccines, and dental cleanings can save $500-$1,200 annually.";
        }
        return "Thanks for that information! Coverage type should align with your pet's age, breed risks, and your preventive care habits. The right choice varies by individual circumstances.";
      
      default:
        return "Perfect! The best pet insurance decision is an informed one.";
    }
  };

  const handleOptionClick = (option: string, question: ConversationQuestion) => {
    addUserMessage(option);

    const newPreferences = { ...userPreferences };
    newPreferences[question.field] = option.toLowerCase();
    setUserPreferences(newPreferences);

    // Add acknowledgment message
    const acknowledgment = getAcknowledgmentMessage(option, question.field);
    
    setTimeout(() => {
      addBotMessageWithDelay(acknowledgment, undefined, true, () => {
        // Wait briefly after acknowledgment completes before asking next question
        setTimeout(() => {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          if (nextIndex < CONVERSATION_FLOW.length) {
            askNextQuestion(nextIndex);
          } else {
            showResults();
          }
        }, 600); // Brief pause to let user read acknowledgment
      });
    }, 400);
  };

  const parseWithClaude = async (userInput: string, currentQuestion: ConversationQuestion): Promise<ParsedResponse> => {
    try {
      const prompt = `You are helping parse user input for a pet insurance questionnaire.

Current question field: ${currentQuestion.field}
User's response: "${userInput}"

Based on the question field, extract the relevant information:

${currentQuestion.field === 'petType' ? `
- If they mention a pet type (dog, cat), return just the pet type in lowercase.
- If they mention both or multiple pets, return "both"
- Examples: "I have a dog" -> "dog", "cat owner" -> "cat", "dog and cat" -> "both"
` : ''}

${currentQuestion.field === 'budget' ? `
- Extract their budget and categorize it:
  - "under $40" for budgets under $40
  - "$40-60" for budgets between $40-60
  - "$60-80" for budgets between $60-80
  - "$80+" for budgets over $80
- Examples: "around $50" -> "$40-60", "$35" -> "under $40"
` : ''}

${currentQuestion.field === 'priority' ? `
- Determine what matters most:
  - "lowest price" for cost-focused users
  - "best coverage" for comprehensive coverage seekers
  - "customer satisfaction" for those who value service
  - "fast claims" for those who prioritize quick reimbursement
- Examples: "I want cheap" -> "lowest price", "good service" -> "customer satisfaction"
` : ''}

${currentQuestion.field === 'coverageType' ? `
- Determine coverage type:
  - "accident only" for basic accident coverage
  - "accident & illness" for standard coverage
  - "comprehensive with wellness" for full coverage including preventive care
` : ''}

CRITICAL: Respond ONLY with a valid JSON object in this exact format:
{
  "extracted_value": "the extracted and normalized value",
  "confidence": "high" or "medium" or "low"
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_API_KEY_HERE",
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error('Claude API request failed');
      }

      const data = await response.json();
      let responseText = data.content[0].text.trim();
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

      const parsed = JSON.parse(responseText);
      return parsed;
    } catch (error) {
      console.error('Error parsing with Claude:', error);
      return { extracted_value: userInput.toLowerCase(), confidence: 'low' };
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    const userMessage = textInput;
    addUserMessage(userMessage);
    setTextInput('');
    setIsProcessing(true);

    try {
      // If we're past the conversation flow or showing recommendations, handle as general input
      if (currentQuestionIndex >= CONVERSATION_FLOW.length || showRecommendations) {
        setIsProcessing(false);
        addBotMessage("Thanks for your message! If you'd like to start a new search, please use the 'Get Quotes from All' button above.", undefined, true);
        return;
      }

      const currentQuestion = CONVERSATION_FLOW[currentQuestionIndex];
      const parsed = await parseWithClaude(userMessage, currentQuestion);

      const newPreferences = { ...userPreferences };
      newPreferences[currentQuestion.field] = parsed.extracted_value;
      setUserPreferences(newPreferences);

      // Generate acknowledgment based on parsed response
      let acknowledgment = "";
      if (parsed.confidence === 'high') {
        acknowledgment = getAcknowledgmentMessage(parsed.extracted_value, currentQuestion.field);
      } else if (parsed.confidence === 'medium') {
        acknowledgment = `Thanks! I think you mentioned "${parsed.extracted_value}". Being specific about your needs helps us provide the most accurate recommendations.`;
      } else {
        acknowledgment = "Got it! Even uncertain preferences help us narrow down the best options for you.";
      }

      setTimeout(() => {
        addBotMessageWithDelay(acknowledgment, undefined, true, () => {
          setIsProcessing(false);
          // Wait briefly after acknowledgment completes before asking next question
          setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            if (nextIndex < CONVERSATION_FLOW.length) {
              askNextQuestion(nextIndex);
            } else {
              showResults();
            }
          }, 600); // Brief pause to let user read acknowledgment
        });
      }, 400);
    } catch (error) {
      console.error('Error processing input:', error);
      setIsProcessing(false);
      addBotMessage("I didn't quite catch that. Could you try again?", undefined, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleTextSubmit();
    }
  };

  const calculateMatchScore = (preferences: UserPreferences, providerName: string): { score: number; reasons: string[] } => {
    let score = 0;
    let maxScore = 0;
    const reasons: string[] = [];

    const cost = costData.find(c => c.provider === providerName);
    const opinion = userOpinions.find(o => o.provider === providerName);
    const claims = claimsData.find(c => c.provider === providerName);
    const plan = plans.find(p => p.provider === providerName);

    if (preferences.petType && cost) {
      maxScore += 2;
      score += 2;
      if (preferences.petType === 'dog') {
        reasons.push(`Excellent coverage for dogs (${cost.dogCost}/month)`);
      } else if (preferences.petType === 'cat') {
        reasons.push(`Great value for cats (${cost.catCost}/month)`);
      } else if (preferences.petType === 'both') {
        reasons.push(`Covers both dogs and cats effectively`);
      }
    }

    if (preferences.budget && cost) {
      maxScore += 3;
      const budgetRanges: { [key: string]: { max?: number; min?: number } } = {
        'under $40': { max: 40 },
        '$40-60': { min: 40, max: 60 },
        '$60-80': { min: 60, max: 80 },
        '$80+': { min: 80 }
      };

      const userBudget = budgetRanges[preferences.budget];
      const avgCost = (parseInt(cost.dogCost.replace('$', '')) + parseInt(cost.catCost.replace('$', ''))) / 2;

      if (userBudget) {
        if (userBudget.max && avgCost <= userBudget.max) {
          score += 3;
          reasons.push(`Perfect fit for your ${preferences.budget} budget (~$${Math.round(avgCost)}/month)`);
        } else if (userBudget.min && avgCost >= userBudget.min && avgCost <= (userBudget.max || 200)) {
          score += 3;
          reasons.push(`Matches your ${preferences.budget} budget range (~$${Math.round(avgCost)}/month)`);
        } else if (userBudget.min && avgCost >= userBudget.min) {
          score += 2;
          reasons.push(`Close to your budget range (~$${Math.round(avgCost)}/month)`);
        }
      }
    }

    if (preferences.priority && opinion) {
      maxScore += 4;

      if (preferences.priority === 'lowest price') {
        const avgCost = cost ? (parseInt(cost.dogCost.replace('$', '')) + parseInt(cost.catCost.replace('$', ''))) / 2 : 100;
        if (avgCost < 50) {
          score += 4;
          reasons.push(`Most affordable option at ~$${Math.round(avgCost)}/month`);
        } else if (avgCost < 70) {
          score += 2;
          reasons.push(`Budget-friendly at ~$${Math.round(avgCost)}/month`);
        }
      } else if (preferences.priority === 'customer satisfaction') {
        const csiScore = parseFloat(opinion.csiRating.split('/')[0]);
        if (csiScore >= 8) {
          score += 4;
          reasons.push(`Top-rated customer experience (${opinion.csiRating} CSI rating)`);
        } else if (csiScore >= 6) {
          score += 2;
          reasons.push(`Strong customer satisfaction (${opinion.csiRating} CSI rating)`);
        }
      } else if (preferences.priority === 'fast claims' && claims) {
        if (claims.claimsSatisfaction === 'Very satisfied') {
          score += 4;
          reasons.push('Excellent claims processing experience');
        } else if (claims.claimsSatisfaction === 'Somewhat satisfied') {
          score += 2;
          reasons.push('Good claims handling reputation');
        }
      } else if (preferences.priority === 'best coverage' && plan) {
        if (plan.category.includes('all-round')) {
          score += 4;
          reasons.push('Most comprehensive coverage available');
        } else if (plan.category.includes('overall')) {
          score += 3;
          reasons.push('Excellent all-around protection');
        }
      }
    }

    if (preferences.coverageType && plan) {
      maxScore += 2;
      if (preferences.coverageType.includes('wellness') && plan.category.includes('wellness')) {
        score += 2;
        reasons.push('Includes preventive care & wellness coverage you need');
      } else if (preferences.coverageType.includes('comprehensive')) {
        score += 1;
        reasons.push('Offers comprehensive accident & illness protection');
      } else if (preferences.coverageType.includes('Accident Only')) {
        score += 1;
        reasons.push('Focused accident-only coverage as requested');
      }
    }

    // Add fallback reasons if no specific matches found
    if (reasons.length === 0) {
      if (plan) {
        reasons.push(`Solid ${plan.category.replace(/\n/g, ' ').toLowerCase()} option`);
      }
      if (cost) {
        const avgCost = (parseInt(cost.dogCost.replace('$', '')) + parseInt(cost.catCost.replace('$', ''))) / 2;
        reasons.push(`Competitive pricing at ~$${Math.round(avgCost)}/month`);
      }
    }

    return {
      score: maxScore > 0 ? score / maxScore : 0,
      reasons: reasons.slice(0, 3) // Limit to top 3 reasons for table display
    };
  };

  const showResults = () => {
    setTimeout(() => {
      // Step 1: Initial message
      addBotMessageWithDelay("Perfect! Let me find the best matches for you...", undefined, true, () => {
        // Step 2: Analyzing message
        addBotMessageWithDelay("Analyzing results...", undefined, true, () => {
          // Step 3: Wait 5 seconds for analyzing, then show final message
          setTimeout(() => {
            setShowRecommendations(true);
            addBotMessageWithDelay("Thanks—here are 3 strong fits based on your preferences", undefined, true, () => {
              // Step 4: Generate and show table after final message completes
              setTimeout(() => {
                const providerNames = Array.from(new Set(costData.map(c => c.provider)));

                const recommendations: ProviderRecommendation[] = providerNames.map(providerName => {
                  const { score, reasons } = calculateMatchScore(userPreferences, providerName);

                  return {
                    provider: providerName,
                    score,
                    matchReasons: reasons,
                    costData: costData.find(c => c.provider === providerName),
                    planDetails: planDetails.find(p => p.provider === providerName),
                    userOpinion: userOpinions.find(o => o.provider === providerName),
                    claimsData: claimsData.find(c => c.provider === providerName),
                    plan: plans.find(p => p.provider === providerName)
                  };
                })
                .filter(r => r.score > 0.3)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

                addTableMessage(recommendations);

                if (onRecommendations) {
                  onRecommendations(recommendations, userPreferences);
                }
              }, 500);
            });
          }, 5000); // 5 second analyzing delay
        });
      });
    }, 400);
  };

  const getRecommendations = (): ProviderRecommendation[] => {
    const providerNames = Array.from(new Set(costData.map(c => c.provider)));

    return providerNames.map(providerName => {
      const { score, reasons } = calculateMatchScore(userPreferences, providerName);

      return {
        provider: providerName,
        score,
        matchReasons: reasons,
        costData: costData.find(c => c.provider === providerName),
        planDetails: planDetails.find(p => p.provider === providerName),
        userOpinion: userOpinions.find(o => o.provider === providerName),
        claimsData: claimsData.find(c => c.provider === providerName),
        plan: plans.find(p => p.provider === providerName)
      };
    })
    .filter(r => r.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setUserPreferences({});
    setShowRecommendations(false);
    setTextInput('');
    setIsProcessing(false);
    setIsChatInitialized(false); // Reset initialization flag
    initializingRef.current = false; // Reset initialization ref

    setTimeout(() => {
      addBotMessageWithDelay(
        "Hi! 👋 I'll help you find the perfect pet insurance provider. Let's get started!", 
        undefined, 
        true, 
        () => {
          // Wait briefly before asking first question
          setTimeout(() => askNextQuestion(), 600);
        }
      );
    }, 300);
  };

  const handleClose = () => {
    // Start the closing animation
    setIsClosing(true);
    
    // After animation completes, clear the chat
    setTimeout(() => {
      setMessages([]);
      setCurrentQuestionIndex(0);
      setUserPreferences({});
      setShowRecommendations(false);
      setTextInput('');
      setIsProcessing(false);
      setIsClosing(false);
      setIsChatInitialized(false); // Reset initialization flag
      initializingRef.current = false; // Reset initialization ref
      
      // Call the onClose callback if provided
      if (onClose) {
        onClose();
      }
    }, 200); // Match the fade-out duration
  };

  const handlePromptClick = (promptText: string) => {
    // Add user message
    addUserMessage(promptText);
    
    // Set processing state
    setIsProcessing(true);
    
    // Simulate processing and provide relevant response
    setTimeout(() => {
      setIsProcessing(false);
      
      // Determine response based on prompt and set initial preferences
      let botResponse = "";
      let initialPreferences: Partial<UserPreferences> = {};
      
      if (promptText.includes("Cheapest") || promptText.includes("cheapest")) {
        botResponse = "Great question! I'll help you find the most affordable pet insurance options.";
        initialPreferences = { priority: 'lowest price' };
      } else if (promptText.includes("Best coverage") || promptText.includes("cat")) {
        botResponse = "Perfect! I'll help you find comprehensive coverage options for cats.";
        initialPreferences = { petType: 'cat', priority: 'best coverage' };
      } else if (promptText.includes("dental")) {
        botResponse = "Dental coverage is important! I'll help you find plans that include dental care.";
        initialPreferences = { coverageType: 'comprehensive with wellness', priority: 'best coverage' };
      }
      
      // Set initial preferences
      setUserPreferences(initialPreferences);
      
      // Add bot response and start conversation flow
      addBotMessageWithDelay(botResponse, undefined, true, () => {
        // Wait briefly before starting questions
        setTimeout(() => {
          setCurrentQuestionIndex(0);
          askNextQuestion(0, initialPreferences);  // Pass preferences directly
        }, 600);
      });
    }, 1200);
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white 32%, white 100%)'
      }} />

      {/* Container */}
      <div className="relative w-full px-4 pb-2" style={{ minHeight: messages.length > 0 ? 'calc(100vh - 120px)' : 'auto' }}>
        {/* Expanded Chat Container - Shows when there are messages */}
        {messages.length > 0 && (
          <div className="mb-4 rounded-[24px] overflow-hidden max-w-[1260px] mx-auto transform transition-all duration-500 ease-out" style={{
            background: 'white',
            boxShadow: '0px 0px 16px 4px rgba(125, 10, 248, 0.12)',
            outline: '1px rgba(0, 122, 200, 0.40) solid',
            outlineOffset: '-1px',
            height: 'calc(100vh - 140px)',
            display: 'flex',
            flexDirection: 'column',
            animation: isClosing ? 'slideDownFadeOut 0.2s ease-in forwards' : 'slideUpFadeIn 0.3s ease-out'
          }}>
            {/* Header with Forbes Logo */}
            <div className="px-4 py-[14px] bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] flex items-center justify-between">
              <div className="relative w-[135px] h-[17px]">
                {/* Forbes Advisor Logo */}
                <img src="/Forbes Advisor Logo.svg" alt="Forbes Advisor" className="w-[135px] h-[17px] object-contain" />
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 hover:rotate-90 transform"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="px-4 pt-10 pb-6 flex-1 overflow-y-auto messages-container">
              <div className="flex flex-col-reverse space-y-6 space-y-reverse min-h-full justify-start">
            {messages.slice().reverse().map((message, reversedIdx) => {
              const originalIdx = messages.length - 1 - reversedIdx;
              return (
              <div 
                key={message.id}
                className="transform transition-all duration-300 ease-out"
                style={{
                  animation: 'messageSlideIn 0.3s ease-out',
                  animationDelay: `${reversedIdx * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'user' ? (
                    <div className="relative max-w-[649px] px-[14px] py-[7px] rounded-2xl bg-[#F8F8FA] text-black transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" style={{ fontFamily: 'Work Sans', fontSize: '17px', lineHeight: '22px' }}>
                      {message.text}
                    </div>
                  ) : message.type === 'table' ? (
                    <div className="w-full max-w-4xl">
                      {/* Comparison Table */}
                      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                        <table className="w-full min-w-[600px]">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" style={{ fontFamily: 'Work Sans' }}>Provider</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" style={{ fontFamily: 'Work Sans' }}>Why It Matches</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" style={{ fontFamily: 'Work Sans' }}>Dog Cost</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" style={{ fontFamily: 'Work Sans' }}>Cat Cost</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900" style={{ fontFamily: 'Work Sans' }}>Match Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {message.tableData?.map((rec: any, index: number) => (
                              <tr key={rec.provider} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                <td className="px-4 py-4">
                                  <div className="font-semibold text-gray-900" style={{ fontFamily: 'Work Sans', fontSize: '14px' }}>
                                    {rec.provider}
                                  </div>
                                  {rec.plan?.category && (
                                    <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Work Sans' }}>
                                      {rec.plan.category.replace(/\n/g, ' ')}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="text-sm text-gray-600 space-y-1" style={{ fontFamily: 'Work Sans' }}>
                                    {rec.matchReasons.slice(0, 2).map((reason: string, idx: number) => (
                                      <div key={idx} className="flex items-start gap-1">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>{reason}</span>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Work Sans' }}>
                                    {rec.costData?.dogCost || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Work Sans' }}>
                                    {rec.costData?.catCost || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${Math.round(rec.score * 100)}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600" style={{ fontFamily: 'Work Sans' }}>
                                      {Math.round(rec.score * 100)}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2 justify-end mt-6">
                        {message.tableData?.map((rec: any) => (
                          <button
                            key={rec.provider}
                            className="h-14 px-4 rounded-[28px] flex items-center gap-2 transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-lg transform button-bounce"
                            style={{
                              background: '#007AC8',
                              boxShadow: '0px 0px 0.5px rgba(0, 0, 0, 0.11) inset',
                              fontFamily: 'Work Sans',
                              fontSize: '14px',
                              fontWeight: '600',
                              lineHeight: '20px',
                              color: 'white'
                            }}
                          >
                            Get Quotes from {rec.provider}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 5L15 15M15 15V5M15 15H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        ))}
                        <button
                          onClick={resetChat}
                          className="h-14 px-4 rounded-[28px] transition-all duration-200 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform button-bounce"
                          style={{
                            background: 'black',
                            boxShadow: '0px 0px 0.5px rgba(0, 0, 0, 0.11) inset',
                            outline: '1px black solid',
                            outlineOffset: '-1px',
                            fontFamily: 'Work Sans',
                            fontSize: '14px',
                            fontWeight: '600',
                            lineHeight: '20px',
                            color: 'white'
                          }}
                        >
                          Get Quotes from All
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full text-black transform transition-all duration-200" style={{ fontFamily: 'Work Sans', fontSize: '17px', lineHeight: '22px' }}>
                      {message.isTyping ? (
                        <TypingText 
                          text={message.text} 
                          speed={20}
                          onComplete={() => handleTypingComplete(message.id)}
                        />
                      ) : (
                        message.text
                      )}
                    </div>
                  )}
                </div>

                {/* Separator after user messages */}
                {message.type === 'user' && (
                  <div className="mt-4 mb-2">
                    <div className="w-full h-px bg-gray-200"></div>
                  </div>
                )}

                {message.type === 'bot' && message.options && reversedIdx === 0 && !showRecommendations && !message.isTyping && message.showOptions && (
                  <div className="mt-6 flex flex-wrap gap-2 justify-end transform transition-all duration-300 ease-out" style={{ animation: 'messageSlideIn 0.3s ease-out' }}>
                    {message.options.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(option, message.options!)}
                        disabled={isProcessing}
                        className="h-14 px-4 rounded-[28px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-md transform button-bounce"
                        style={{
                          background: '#F8F8FA',
                          boxShadow: '0px 0px 0.5px rgba(0, 0, 0, 0.11) inset',
                          outline: '1px #BEBEBE solid',
                          outlineOffset: '-1px',
                          fontFamily: 'Work Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '20px',
                          color: '#1D1D1F'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              );
            })}

            {isProcessing && (
              <div className="flex justify-start transform transition-all duration-300 ease-out" style={{ animation: 'messageSlideIn 0.3s ease-out' }}>
                <div className="text-black flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span style={{ fontFamily: 'Work Sans', fontSize: '17px', lineHeight: '22px' }}>Analyzing your response...</span>
                </div>
              </div>
            )}


              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts - Only show when no recommendations */}
            {!showRecommendations && (
              <div className="px-4 pb-6 flex gap-2 flex-shrink-0">
                <button 
                  onClick={() => handlePromptClick("Cheapest pet insurance for a dog")}
                  className="p-[10px] bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md transform" 
                  style={{
                    outline: '1px #F4F5F8 solid',
                    outlineOffset: '-1px'
                  }}
                >
                  <span style={{ fontFamily: 'Work Sans', fontSize: '12px', lineHeight: '18px', color: '#606F7F' }}>Cheapest pet insurance for a dog</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 15V5M15 15H5" stroke="#606F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={() => handlePromptClick("Best coverage for a cat")}
                  className="p-[10px] bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md transform" 
                  style={{
                    outline: '1px #F4F5F8 solid',
                    outlineOffset: '-1px'
                  }}
                >
                  <span style={{ fontFamily: 'Work Sans', fontSize: '12px', lineHeight: '18px', color: '#606F7F' }}>Best coverage for a cat</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 15V5M15 15H5" stroke="#606F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={() => handlePromptClick("Which plan covers dental?")}
                  className="p-[10px] bg-white shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md transform" 
                  style={{
                    outline: '1px #F4F5F8 solid',
                    outlineOffset: '-1px'
                  }}
                >
                  <span style={{ fontFamily: 'Work Sans', fontSize: '12px', lineHeight: '18px', color: '#606F7F' }}>Which plan covers dental?</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 15V5M15 15H5" stroke="#606F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Bottom Input Box */}
            <div className="px-4 pb-[10px] flex-shrink-0">
              <div className="px-4 py-3 bg-white rounded-lg shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] flex items-center gap-[10px] transition-all duration-200 hover:shadow-lg focus-within:shadow-lg focus-within:ring-2 focus-within:ring-blue-200" style={{
                outline: '1px #CED4DB solid',
                outlineOffset: '-1px'
              }}>
                {/* Search Icon */}
                <img src="/star-06.svg" alt="Search" className="w-6 h-6" />

                {/* Input */}
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Hi there! What are you interested in..."
                  disabled={isProcessing}
                  className="flex-1 bg-transparent border-none outline-none placeholder:text-[#B6B6B6] transition-all duration-200 focus:placeholder:text-[#999999]"
                  style={{ fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '500', lineHeight: '24px' }}
                />

                {/* Send Button */}
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim() || isProcessing}
                  className="min-w-[48px] h-12 bg-[#007AC8] rounded-[44px] shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] flex items-center justify-center transition-all duration-200 hover:bg-[#0066a3] hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#007AC8]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <img src="/arrow-right-white.svg" alt="Send" className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Default Search Bar - Show when no messages */}
        {messages.length === 0 && (
          <div className="space-y-2 max-w-[1260px] mx-auto">
            {/* Search Bar */}
            <div className="px-4 py-3 bg-white/80 shadow-[0px_0px_16px_4px_rgba(125,10,248,0.12)] rounded-lg flex items-center gap-[10px]" style={{
              outline: '1px #CED4DB solid',
              outlineOffset: '-1px'
            }}>
              {/* Search Icon */}
              <img src="/star-06.svg" alt="Search" className="w-6 h-6" />

              {/* Input */}
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hi there! What are you interested in..."
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none placeholder:text-[#B6B6B6]"
                style={{ fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '500', lineHeight: '24px' }}
              />

              {/* Send Button */}
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || isProcessing}
                className="min-w-[48px] h-12 bg-[#007AC8] rounded-[44px] shadow-[0px_4px_8px_-1px_rgba(0,0,0,0.10)] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <img src="/arrow-right-white.svg" alt="Send" className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Subtext */}
            <div className="text-center">
              <p className="text-gray-500" style={{
                fontFamily: 'Work Sans',
                fontSize: '12px',
                lineHeight: '16px'
              }}>
                Ask questions about your pet and get tailored recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
