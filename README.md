# 🛍️ E-commerce Product Assistant

An **AI-powered chatbot** built using **Google AI Studio (Gemini API)** that helps users **find, compare, and recommend products** through natural conversation — just like chatting with your personal shopping expert! 🤖✨  

---

## 🚀 Project Overview

The **E-commerce Product Assistant** makes online shopping easier and smarter by allowing users to describe what they want in plain language.  
It then suggests or compares products, summarizes pros and cons, and gives friendly shopping advice.

> 💬 Example Queries:
> - “Find me a laptop under ₹60,000 for video editing.”
> - “Compare iPhone 14 and Samsung S23.”
> - “Suggest a smartwatch with long battery life.”

---

## 🧠 Features

✅ Conversational Product Search — Finds items by category, budget, and purpose.  
✅ Smart Comparisons — Highlights pros, cons, and specs.  
✅ Personalized Suggestions — Adapts to user intent and style.  
✅ Natural, Friendly Chat — Human-like tone and clarity.  
✅ Extendable with Real APIs — Can connect to e-commerce APIs (Flipkart, Amazon, Shopify).  

---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| **AI Engine** | Google Gemini (AI Studio) |
| **Backend** | Python (Flask / FastAPI) |
| **Frontend (Optional)** | Streamlit / React / HTML |
| **Database (Optional)** | Firebase / Firestore / JSON |
| **Enhancements** | Vector Search, Semantic Embeddings |

---

## 🧩 System Flow

1. **User Input** → “Best laptops under ₹50,000”  
2. **Gemini API** → Understands context, budget, category  
3. **Data Retrieval** → Fetch products from Firestore / API / JSON  
4. **Response Generation** → AI compares and explains best options  

---

## 💬 Example System Prompt

```text
You are a helpful E-commerce Product Assistant.
Your goal is to help users find and compare products based on their budget, preferences, and use case.
Always respond with clear comparisons, short pros and cons, and friendly explanations.
If product data is missing, guide users on how to choose the right product.

