import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, User, Bot, Clipboard, Phone } from 'lucide-react';

export default function ContractTechBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your Contract Tech Bot. I can help with:\n\n**Contract FAQs**: Payment terms, confidentiality, liability, termination, breach, renewal, IP ownership, and more.\n\n**System Training**: Login, account setup, creating contracts, searching, workflows, tracking expirations, security, reporting, and best practices.\n\nFor complex issues or system problems, click "Report Issue" to submit a request. What can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [escalationDetails, setEscalationDetails] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Issue categories for classification
  const issueCategories = {
    'product_enhancement': {
      keywords: ['feature', 'improvement', 'add', 'enhancement', 'new capability', 'wish', 'request'],
      label: 'Product Enhancement'
    },
    'technical_issue': {
      keywords: ['not working', 'error', 'broken', 'crash', 'fail', 'problem', 'issue', 'glitch', 'loading', 'timeout'],
      label: 'Technical Issue'
    },
    'account_issue': {
      keywords: ['login', 'password', 'account', 'access', 'permission', 'locked', 'blocked', 'verification', 'reset'],
      label: 'Account Issue'
    },
    'product_bug': {
      keywords: ['bug', 'unexpected behavior', 'malfunction', 'incorrect', 'wrong'],
      label: 'Product Bug'
    }
  };

  const classifyIssue = (input) => {
    const lowerInput = input.toLowerCase();
    for (const [category, data] of Object.entries(issueCategories)) {
      if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
        return { category, label: data.label };
      }
    }
    return { category: 'other', label: 'Other' };
  };

  // FAQ Knowledge Base - Contract & System Training FAQs
  const faqDatabase = {
    // Contract-related FAQs
    'contract termination': {
      keywords: ['terminate', 'cancel', 'end contract', 'exit'],
      answer: 'Contract termination typically requires:\n\n1. **Notice Period**: Most contracts require 30-90 days written notice\n2. **Termination Clause**: Review the specific termination provisions in your agreement\n3. **Payment Obligations**: Outstanding payments may still be due\n4. **Confidentiality**: NDA obligations usually survive termination\n\nWould you like specific information about your contract type?'
    },
    'breach of contract': {
      keywords: ['breach', 'violation', 'violated', 'not complying'],
      answer: 'If there\'s a potential breach:\n\n1. **Document Everything**: Keep records of all communications and incidents\n2. **Review Contract Terms**: Check what constitutes a breach\n3. **Send Notice**: Issue a formal breach notification letter\n4. **Cure Period**: Most contracts allow 10-30 days to remedy the breach\n5. **Escalate if Unresolved**: If not resolved, escalation to legal may be needed\n\nThis is a complex matter. Would you like me to escalate this to a specialist?'
    },
    'payment terms': {
      keywords: ['payment', 'invoice', 'due date', 'late payment', 'net 30', 'net 60'],
      answer: 'Common payment term definitions:\n\n- **Net 30**: Payment due within 30 days of invoice\n- **Net 60**: Payment due within 60 days of invoice\n- **Due on Receipt**: Payment due immediately\n- **Late Fees**: Typically 1-2% per month on overdue amounts\n- **Discount**: Early payment (e.g., 2/10 Net 30) may offer a small discount\n\nCheck your contract for specific payment schedules and penalties.'
    },
    'confidentiality': {
      keywords: ['confidential', 'nda', 'non-disclosure', 'proprietary', 'secret'],
      answer: 'Confidentiality obligations typically include:\n\n1. **Definition**: What information is considered confidential\n2. **Duration**: How long the obligation lasts (often extends beyond contract termination)\n3. **Exceptions**: Public information, independently developed info, etc.\n4. **Permitted Use**: Who can access and how it can be used\n5. **Return**: Usually must return or destroy confidential materials upon termination\n\nViolating an NDA can result in significant legal consequences.'
    },
    'liability limits': {
      keywords: ['liability', 'damages', 'indemnification', 'cap', 'limit'],
      answer: 'Liability clauses typically specify:\n\n1. **Cap on Liability**: Often limited to a percentage of contract value\n2. **Excluded Damages**: Indirect, consequential, or punitive damages often excluded\n3. **Indemnification**: Obligation to cover third-party claims\n4. **Insurance**: May require specific insurance coverage\n\nLiability limits protect both parties and are crucial to understand.'
    },
    'renewal': {
      keywords: ['renew', 'renewal', 'auto-renew', 'extend', 'extension', 'renewal alerts', 'expiration'],
      answer: 'Renewal provisions typically include:\n\n1. **Automatic Renewal**: Contracts may auto-renew unless canceled in advance\n2. **Notice Required**: Most require 30-60 days advance notice to prevent renewal\n3. **New Terms**: Renewed contracts may have different terms or pricing\n4. **Renewal Dates**: Mark renewal deadlines on your calendar\n5. **Renewal Alerts**: Automatic notifications are sent before expiration dates\n\nMiss the cancellation deadline and you could be locked in for another term!'
    },
    'contract review': {
      keywords: ['review', 'check', 'understand', 'what does', 'explain'],
      answer: 'When reviewing a contract, focus on:\n\n1. **Key Terms**: Parties, duration, payment, deliverables\n2. **Obligations**: What you must do and what the other party must do\n3. **Liability & Indemnification**: What happens if something goes wrong\n4. **Termination**: How to exit the agreement\n5. **Confidentiality & IP**: Ownership and protection of information\n6. **Dispute Resolution**: Arbitration or litigation?\n\nFor detailed analysis, I can escalate to a contract specialist.'
    },
    'ip ownership': {
      keywords: ['intellectual property', 'ip', 'ownership', 'copyright', 'patent', 'work product'],
      answer: 'IP ownership should clearly specify:\n\n1. **Pre-existing IP**: What you bring to the contract\n2. **Work Product**: Who owns what\'s created during the engagement\n3. **Licensing Rights**: What rights each party has\n4. **Attribution**: Whether credit must be given\n5. **Derivative Works**: Can either party modify the original?\n\nIP disputes can be costly. Ensure terms are clear and acceptable.'
    },

    // System Training FAQs
    'login': {
      keywords: ['login', 'log in', 'sign in', 'access', 'password', 'credentials'],
      answer: 'To log in to the contract management system:\n\n1. **Use Company Credentials**: Enter your company username and password\n2. **SSO Option**: Use Single Sign-On (SSO) login if enabled by your administrator\n3. **Forgot Password**: Click "Forgot Password" or contact your system administrator\n4. **Account Access**: Contact your system administrator or IT support team if you don\'t have access\n\nEnsure you use the correct credentials provided by your organization.'
    },
    'system access': {
      keywords: ['access', 'permission', 'admin', 'administrator', 'setup', 'account', 'who to contact'],
      answer: 'For system access and setup:\n\n1. **New User Setup**: Contact your contract management system administrator\n2. **IT Support**: Reach out to your IT support team for credential issues\n3. **Access Permissions**: Admins manage role-based access control\n4. **Notification Settings**: Navigate to user settings or profile section within the system\n5. **Profile Updates**: Update your profile and notification preferences in the settings area\n\nYour administrator will assign appropriate access levels based on your role.'
    },
    'create contract': {
      keywords: ['create', 'new contract', 'new request', 'contract record', 'form', 'required fields'],
      answer: 'To create a new contract record:\n\n1. **Go to Create Section**: Navigate to "Create Contract" or "New Request"\n2. **Complete Required Fields**:\n   - Contract title\n   - Vendor/customer name\n   - Effective date\n   - Expiration date\n   - Contract owner\n   - Contract type\n\n3. **Use Templates**: Approved contract templates are available for standard agreements\n4. **Upload Documents**: Attach supporting documents using the upload option\n5. **Best Practice**: Use standard naming conventions and complete all fields before submission'
    },
    'search contracts': {
      keywords: ['search', 'find', 'locate', 'filter', 'query', 'contract id', 'vendor'],
      answer: 'To search for contracts:\n\n**Search Options**:\n- Contract ID\n- Vendor name\n- Keywords\n- Dates\n- Status filters\n\n**Why Search Fails**:\n- Incorrect search criteria\n- Limited access permissions\n- Contract archived or inactive\n\n**Save Searches**: Many systems allow you to save frequently used searches and create favorites for quick access.'
    },
    'submit approval': {
      keywords: ['submit', 'approval', 'workflow', 'approver', 'status', 'reject', 'edit'],
      answer: 'For contract approval workflow:\n\n1. **Submit for Approval**: Select "Submit for Approval" option after completing contract details\n2. **Check Status**: View approval status in the workflow or status tracking section\n3. **If Rejected**: The contract is returned with comments for revision\n4. **Editing**: Editing permissions depend on workflow status and your user role\n5. **Version Control**: The latest approved/executed version is marked as final'
    },
    'track expiration': {
      keywords: ['expiration', 'expire', 'track', 'deadline', 'reminder', 'alert', 'dashboard'],
      answer: 'To track contract expirations:\n\n1. **Use Dashboards**: View contract expiration dates on system dashboards\n2. **Reports**: Use reporting features to identify expiring contracts\n3. **Renewal Alerts**: Automatic notifications are sent before contract expiration dates\n4. **Update Status**: Open the contract record and select appropriate lifecycle status\n5. **Regular Review**: Check contracts regularly, especially before renewals or expirations'
    },
    'version control': {
      keywords: ['version', 'history', 'revision', 'changes', 'restore', 'final'],
      answer: 'About contract version control:\n\n1. **What It Is**: Version control tracks changes and maintains history of contract revisions\n2. **Final Version**: The latest approved or executed version is marked as final\n3. **Access History**: View previous versions through version history section\n4. **Restore Older**: Some systems allow you to restore and access previous contract versions\n5. **Track Changes**: All modifications are recorded for audit and compliance purposes'
    },
    'security access': {
      keywords: ['security', 'access', 'confidential', 'encrypt', 'role', 'share', 'permission'],
      answer: 'Security and access controls:\n\n1. **Access Limitations**: Access depends on role-based permissions and department access levels\n2. **External Sharing**: Only permitted by company policy and system permissions\n3. **Confidential Protection**:\n   - Role-based access control\n   - Encryption\n   - Audit logs\n   - Secure storage\n\n4. **Why Restricted**: Ensures sensitive information is protected and compliant'
    },
    'generate reports': {
      keywords: ['report', 'reporting', 'analytics', 'export', 'data', 'excel', 'pdf'],
      answer: 'To generate and export reports:\n\n1. **Access Reports**: Use the reporting or analytics section\n2. **Select Criteria**: Choose your report type and parameters\n3. **Common Reports**:\n   - Expiring contracts\n   - Vendor agreements\n   - Approval status\n   - Contract value summaries\n\n4. **Export Options**: Export to Excel, CSV, or PDF formats\n5. **Customize**: Filter and sort data as needed for your analysis'
    },
    'troubleshoot': {
      keywords: ['slow', 'issue', 'problem', 'fail', 'error', 'upload', 'notification', 'email'],
      answer: 'Common troubleshooting steps:\n\n**System Running Slowly**:\n- Check large searches or network issues\n- Try a different browser or clear cache\n\n**Upload Failures**:\n- Verify file size and format\n- Check internet connection\n- Confirm user permissions\n\n**Email Notifications Not Received**:\n- Verify notification settings are enabled\n- Check email address accuracy\n- Look in spam folder\n- Verify system alert configuration\n\n**Need More Help**: Submit a support ticket or contact help desk'
    },
    'best practices': {
      keywords: ['best practice', 'data entry', 'metadata', 'naming', 'review', 'standards'],
      answer: 'Best practices for contract management:\n\n**Data Entry**:\n- Use standard naming conventions\n- Complete all required fields\n- Upload final signed copies\n- Review data before submission\n\n**Metadata Importance**:\n- Improves searchability\n- Enhances reporting accuracy\n- Supports compliance tracking\n- Enables better renewal management\n\n**Review Schedule**: Contracts should be reviewed regularly, especially before renewals, amendments, or expiration dates'
    }
  };

  // Escalation triggers removed - only manual escalation via button now

  const findFAQMatch = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const [topic, data] of Object.entries(faqDatabase)) {
      if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
        return { topic, answer: data.answer };
      }
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Try to match FAQ
    const faqMatch = findFAQMatch(input);
    const issueType = classifyIssue(input);
    
    let botResponse;
    if (faqMatch) {
      botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `**${faqMatch.topic.charAt(0).toUpperCase() + faqMatch.topic.slice(1)}**\n\n${faqMatch.answer}`,
        timestamp: new Date()
      };
    } else if (issueType.category !== 'other') {
      // Non-FAQ issue detected (product enhancement, technical issue, account issue, bug, etc.)
      botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `I see you're reporting a **${issueType.label}**. This requires specialized attention from our team. Please click the "Report Issue" button below to submit detailed information about your concern. Our team will review and address it promptly.`,
        timestamp: new Date()
      };
    } else {
      // General question not in FAQ
      botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `I don't have a direct answer to that question in my FAQ database. If this is related to a product issue, technical problem, account concern, or feature request, please click the "Report Issue" button to submit the details. Otherwise, please feel free to ask another contract-related question.`,
        timestamp: new Date()
      };
    }

    setMessages(prev => [...prev, botResponse]);

    setLoading(false);
  };

  const handleEscalateButton = () => {
    // Open Zapier form in new tab
    window.open('https://cmphdox67000ggoufnt9hjstr.zapier.app/', '_blank');
    
    const escalationId = `ESC-${Date.now()}`;
    setEscalated(true);
    setEscalationDetails({
      id: escalationId,
      topic: 'Manual escalation',
      timestamp: new Date().toLocaleString()
    });

    const botMessage = {
      id: messages.length + 1,
      type: 'bot',
      escalated: true,
      text: `Your request has been escalated to our human specialist team.\n\n**Escalation ID**: ${escalationId}\n\nA form has opened in a new window where you can submit the full details of your contract issue. A contract specialist will be assigned to your case and will contact you within 2 business hours. Feel free to ask me more questions in the meantime!`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }} className="flex flex-col">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }} className="bg-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }} className="p-2 rounded-lg">
            <Clipboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contract Tech Bot</h1>
            <p className="text-slate-400 text-sm">AI-powered contract FAQs with human escalation</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }} className="rounded-lg p-4 max-w-2xl">
                  <div className="flex items-start gap-2">
                    <Bot className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      {message.escalated && (
                        <div style={{ background: 'rgba(251, 146, 60, 0.1)', borderLeft: '3px solid #f97316' }} className="mb-3 p-3 rounded">
                          <div className="flex items-center gap-2 text-orange-400 mb-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-semibold">Escalation in Progress</span>
                          </div>
                          <p className="text-slate-300 text-sm">{message.text.split('\n\n')[0]}</p>
                          <div className="mt-2 p-2 bg-slate-800 rounded text-xs font-mono text-slate-300">
                            {message.text.split('**')[1]}: {message.text.split('**')[2]}
                          </div>
                        </div>
                      )}
                      {!message.escalated && (
                        <div className="text-slate-300 whitespace-pre-line text-sm">
                          {message.text.split('\n').map((line, i) => (
                            <div key={i}>
                              {line.startsWith('**') ? (
                                <strong className="text-blue-400">{line.replace(/\*\*/g, '')}</strong>
                              ) : (
                                line
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {message.type === 'user' && (
                <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }} className="rounded-lg p-4 max-w-2xl">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 text-white text-sm">{message.text}</div>
                    <User className="w-5 h-5 text-blue-200 mt-1 flex-shrink-0" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(148, 163, 184, 0.2)' }} className="rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-400 animate-pulse" />
                  <div className="flex gap-1">
                    <div style={{ background: '#3b82f6' }} className="w-2 h-2 rounded-full animate-bounce"></div>
                    <div style={{ background: '#3b82f6' }} className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div style={{ background: '#3b82f6' }} className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Action Bar */}
      {escalated && escalationDetails && (
        <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)' }} className="p-4">
          <div className="max-w-4xl mx-auto">
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', borderLeft: '3px solid #22c55e' }} className="p-4 rounded mb-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold text-sm">Case Escalated - Waiting for Specialist</span>
              </div>
              <p className="text-slate-400 text-xs mb-2">Your escalation ID: <span className="font-mono text-slate-300">{escalationDetails.id}</span></p>
              <p className="text-slate-400 text-xs">A contract specialist will be in touch within 2 business hours. You can continue describing your issue below.</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)' }} className="bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 mb-3">
            <button
              onClick={handleEscalateButton}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'rgba(148, 163, 184, 0.1)',
                color: '#cbd5e1',
                border: '1px solid rgba(148, 163, 184, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(148, 163, 184, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(148, 163, 184, 0.1)';
              }}
            >
              Report Issue
            </button>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about payment terms, confidentiality, liability, renewal, breach of contract..."
              className="flex-1 px-4 py-3 rounded-lg text-white placeholder-slate-500 outline-none"
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)'
              }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
              style={{
                background: input.trim() && !loading ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' : 'rgba(148, 163, 184, 0.1)',
                color: '#ffffff'
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            💡 Ask about contracts: payment terms, confidentiality, liability, termination, breach, renewal, IP ownership. Ask about system: login, account access, create contract, search, workflows, expiration tracking, reporting, security, best practices. For bugs, technical issues, or feature requests, click "Report Issue".
          </p>
        </div>
      </div>
    </div>
  );
}