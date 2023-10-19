const questionData = [
  {
    questionNumber: 1,
    category: "test",
    question: "What's the worst part about coding interviews?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Algos",
    answerTwo: "Getting the interview in the first place",
    answerThree: "Networking",
    answerFour: "Making it to the final round and they change the offer",
    answerFive: "What's a coding interview?",
    timesCorrect: 4,
    timesIncorrect: 2,
  },
  // Question 2
  {
    questionNumber: 2,
    category: "JavaScript",
    question: "What is JavaScript?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "A scripting language used to make the website interactive",
    answerTwo: "An assembly language used to make the website interactive",
    answerThree: "A compiled language used to make the website interactive",
    answerFour: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 3
  {
    questionNumber: 3,
    category: "JavaScript",
    question: "Which of the following is correct about JavaScript?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It's an object-based language",
    answerTwo: "It's an assembly-language",
    answerThree: "It's an object-oriented language",
    answerFour: "It's a high-level language",
    answerFive: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 4
  {
    questionNumber: 4,
    category: "JavaScript",
    question: "Among the given statements, which statement defines closures in JavaScript?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne:
      "JavaScript is a function that is enclosed with references to its inner function scope",
    answerTwo:
      "JavaScript is a function that is enclosed with references to its lexical environment",
    answerThree:
      "JavaScript is a function that is enclosed with the object to its inner function scope",
    answerFour: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 5
  {
    questionNumber: 5,
    category: "JavaScript",
    question: "Arrays in JavaScript are defined by which of the following statements?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It is an ordered list of values",
    answerTwo: "It is an ordered list of objects",
    answerThree: "It is an ordered list of strings",
    answerFour: "It is an ordered list of functions",
    answerFive: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 6
  {
    questionNumber: 6,
    category: "JavaScript",
    question:
      "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Position",
    answerTwo: "Window",
    answerThree: "Standard",
    answerFour: "Location",
    answerFive: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 7
  {
    questionNumber: 7,
    category: "JavaScript",
    question: "Which of the following scoping type does JavaScript use?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Sequential",
    answerTwo: "Segmental",
    answerThree: "Lexical",
    answerFour: "Literal",
    answerFive: "None of the above",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 8
  {
    questionNumber: 8,
    category: "JavaScript",
    question: "What is the basic difference between JavaScript and Java?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Functions are considered fields",
    answerTwo: "Functions are values, and there is no hard distinction between methods and fields",
    answerThree: "Variables are specific",
    answerFour: "There are no differences",
    timesCorrect: 4,
    timesIncorrect: 2,
  },

  // Question 9 (appears to be a duplicate of 8)

  // Question 10
  {
    questionNumber: 10,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of the 'splice' method in JavaScript?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Constant (O(1))",
    answerTwo: "Linear (O(n))",
    answerThree: "Quadratic (O(n^2))",
    answerFour: "Logarithmic (O(log n))",
    answerFive: "Exponential (O(2^n))",
    timesCorrect: 2,
    timesIncorrect: 6,
  },

  // Question 11
  {
    questionNumber: 11,
    category: "Data Structures and Algorithms",
    question: "What is the space complexity of a recursive function?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Constant (O(1))",
    answerTwo: "Linear (O(n))",
    answerThree: "Quadratic (O(n^2))",
    answerFour: "Linear (O(log n))",
    answerFive: "Exponential (O(2^n))",
  },

  // Question 12
  {
    questionNumber: 12,
    category: "Data Structures and Algorithms",
    question: "Which sorting algorithm has the best average-case time complexity?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Bubble Sort",
    answerTwo: "Merge Sort",
    answerThree: "Selection Sort",
    answerFour: "Quick Sort",
    answerFive: "Insertion Sort",
    timesCorrect: 1,
    timesIncorrect: 4,
  },

  // Question 13
  {
    questionNumber: 13,
    category: "Data Structures and Algorithms",
    question: "Data Structure Ops: Array (unsorted) -- Deletion",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(1)",
    answerTwo: "O(N)",
    answerThree: "O(log(n))",
    answerFour: "O(n log(n))",
    answerFive: "O(m)",
    timesCorrect: 1,
    timesIncorrect: 4,
  },

  // Question 14
  {
    questionNumber: 14,
    category: "Data Structures and Algorithms",
    question: "Data Structure Ops: Splay Tree (unsorted) -- Search(Average)",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(1)",
    answerTwo: "O(N)",
    answerThree: "O(log(n))",
    answerFour: "O(n log(n))",
    answerFive: "O(m)",
    timesCorrect: 1,
    timesIncorrect: 4,
  },

  // Question 15
  {
    questionNumber: 15,
    category: "Data Structures and Algorithms",
    question: "Data Structure Ops: AVL Tree (unsorted) -- Insertion(worst)",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(1)",
    answerTwo: "O(N)",
    answerThree: "O(log(n))",
    answerFour: "O(n log(n))",
    answerFive: "O(m)",
    timesCorrect: 1,
    timesIncorrect: 4,
  },

  // //////////////linked lists ////////////
  //// source https://www.interviewbit.com/linked-list-mcq/ ////

  {
    questionNumber: 16,
    category: "Data Structures and Algorithms",
    question: "What information is stored in a doubly-linked list's nodes?",
    correctAnswerArray: [false, false, false, true],
    answerOne: "Value of node",
    answerTwo: "Address of next node",
    answerThree: "Address of previous node",
    answerFour: "All of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 17,
    category: "Data Structures and Algorithms",
    question: "What is the optimal time complexity to count the number of nodes in a linked list?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(log n)",
    answerFour: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 18,
    category: "Data Structures and Algorithms",
    question: "Which of the following are applications of linked lists?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Implementing file systems",
    answerTwo: "haining in hash tables",
    answerThree: "binary tree implementation",
    answerFour: "All of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 19,
    category: "Data Structures and Algorithms",
    question:
      "Insertion of an element at the middle of a linked list requires the modification of how many pointers?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "2",
    answerTwo: "1",
    answerThree: "3",
    answerFour: "4",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 20,
    category: "Data Structures and Algorithms",
    question:
      "Insertion of an element at the end of a linked list requires the modification of how many pointers?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "2",
    answerTwo: "1",
    answerThree: "3",
    answerFour: "4",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 21,
    category: "Data Structures and Algorithms",
    question:
      "In the worst case, the number of comparisons needed to search a singly linked list of length n for a given element will be?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n+m)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 22,
    category: "Data Structures and Algorithms",
    question: "Which of the following algos is not feasible to implement in a linked list??",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Linear Search",
    answerTwo: "Binary Search",
    answerThree: "Merge Sort",
    answerFour: "Insertion Sort",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 23,
    category: "Data Structures and Algorithms",
    question: "Which of the following algos is not feasible to implement in a linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Linear Search",
    answerTwo: "Binary Search",
    answerThree: "Merge Sort",
    answerFour: "Insertion Sort",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 24,
    category: "Data Structures and Algorithms",
    question: "Which of the following can be done with linked lists?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Implementation of Stacks and Queues",
    answerTwo: "Implementation of Binary Trees",
    answerThree: "Implementation of Data Structures that can simulate Dynamic Arrays",
    answerFour: "All of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 25,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity to insert an element to the front of a linked list?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n+m)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 26,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity to insert an element to the rear of a linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n+m)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 27,
    category: "Data Structures and Algorithms",
    question: "Linked lists nodes can be implemented using what?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Structs",
    answerTwo: "lasses",
    answerThree: "Both",
    answerFour: "Neither",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 28,
    category: "Data Structures and Algorithms",
    question:
      "Which type of linked list stores the address of the head node in the next pointer of the last node?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Singly",
    answerTwo: "Doubly",
    answerThree: "Hashed List",
    answerFour: "ircular",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 29,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity to delete a node from a doubly-linked list?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n+m)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 30,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of a binary search on a linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n+m)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },

  {
    questionNumber: 31,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity to concatenate two linked lists?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(1) if we have the address of the last node of one of the lists",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 32,
    category: "Data Structures and Algorithms",
    question: "Which type of linked list traversals can be performed in both directions?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Singly",
    answerTwo: "Doubly",
    answerThree: "Circularly",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 33,
    category: "Data Structures and Algorithms",
    question:
      "Which of the following algorithm is the optimal way to find the middle element of a linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Find the length, and then traverse to the length/2 node",
    answerTwo: "Fast and slow pointer method",
    answerThree: "Find distance of all nodes and print middle nodes",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 34,
    category: "Data Structures and Algorithms",
    question: "A linked list where none of the nodes contain a NULL pointer is?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Singly",
    answerTwo: "Doubly",
    answerThree: "Circularly",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 35,
    category: "Data Structures and Algorithms",
    question: "Which of the following statements are true?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Random access of elements in a linked list is not possible",
    answerTwo: "Arrays have better cache locality than linked lists",
    answerThree: "The size of linked lists is dynamic and can be changed as needed.",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 36,
    category: "Data Structures and Algorithms",
    question:
      "What is the optimal complexity we can achieve when removing duplicates from an unsorted linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 37,
    category: "Data Structures and Algorithms",
    question:
      "What is the optimal complexity we can achieve when removing duplicates from a sorted linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 38,
    category: "Data Structures and Algorithms",
    question: "Which of the following sorting algorithms can be applied to linked lists?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Merge Sort",
    answerTwo: "Insertion Sort",
    answerThree: "Quick Sort",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 39,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet do?",
    codeSnippet: `
    ListNode* solve(ListNode* head, int x) {
      ListNode* front = head;
      int count = 1;
      while(front != NULL) {
        cout << front -> data << " " << head -> data << endl;
        if(count <= x) {
          front = front -> next;
        }
        else {
          head = head -> next;
          front = front -> next;
        }
        count++;
      }
      return head;
    }    
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Find the xth node from beginning of a linked list",
    answerTwo: "Find xth node from end of a linked list",
    answerThree: "Find x-1th node from end of a linked list",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 40,
    category: "Data Structures and Algorithms",
    question: "What will be the output of the following code snippet for 1->2->3->4->5?",
    codeSnippet: `
    void solve (ListNode* head) {
      while(head != NULL) {
      cout << head -> data << " ";
      head = head -> next;
    }
  
    }    
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "21345",
    answerTwo: "12345",
    answerThree: "54321",
    answerFour: "23154",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 41,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet do?",
    codeSnippet: `
    int solve (ListNode* list) {
      ListNode* fast = list;
    ListNode* slow = list;
    while(fast -> next != NULL && fast -> next -> next != NULL) {
      fast = fast -> next -> next;
      slow = slow -> next;
    }
    return slow -> data;
  
    }    
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Find the middle element in the linked list",
    answerTwo: "Find the last element in the linked list",
    answerThree: "Find the first element in the linked list",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 42,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet do?",
    codeSnippet: `
    void solve(ListNode* node) {
      node = node -> next;  
    }    
    `,
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Deletes the given node from the linked list",
    answerTwo: "Deletes head of the list",
    answerThree: "Deletes the last node of the list",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 43,
    category: "Data Structures and Algorithms",
    question:
      "The type of pointer used to point to the address of the next element in a linked list",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Pointer to character",
    answerTwo: "Pointer to integer",
    answerThree: "Pointer to node",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 44,
    category: "Data Structures and Algorithms",
    question: "Which is the most optimal to find an element at the kth position in a linked list?",
    correctAnswerArray: [],
    answerOne: "Singly Linked List",
    answerTwo: "Doubly Linked List",
    answerThree: "Circular Linked List",
    answerFour: "Array implementation of the linked list",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 45,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of adding 2 numbers as a linked list?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "O(max(n,m)) where n and m are sizes of the list",
    answerTwo: "O(n+m)",
    answerThree: "O(min(n,m))",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 1,
  },
  {
    questionNumber: 46,
    category: "Data Structures and Algorithms",
    question: "Which of the following problems can be solved using two tortoise and hare pointers?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Detecting cycle in a linked list",
    answerTwo: "Finding the intersection of two linked lists",
    answerThree: "Finding the middle element of a linked list",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 47,
    category: "Data Structures and Algorithms",
    question: "Which of the following is similar about singly and doubly linked lists?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne:
      "XBoth of them are not able to access the data at a random position in constant time",
    answerTwo:
      "XBoth of them can add a new node after a given node or at the beginning of a new list in O(1) time",
    answerThree: "Both of them can delete the first node in O(1) time. ",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 48,
    category: "Data Structures and Algorithms",
    question: "Rotating a linked list by some places clockwise will take a TIME complexity of?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 49,
    category: "Data Structures and Algorithms",
    question: "Rotating a linked list by some places clockwise will take a SPACE complexity of?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 50,
    category: "Data Structures and Algorithms",
    question: "What is the space complexity for deleting a linked list?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 51,
    category: "Data Structures and Algorithms",
    question: "What is the space complexity for storing a linked list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(n)",
    answerThree: "O(1)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 52,
    category: "Data Structures and Algorithms",
    question: "Which of the following operations takes O(1) time?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Insert element at the start of linked list",
    answerTwo: "Insert element at end of linked list",
    answerThree: "Find length of linked list",
    answerFour: "None of the above",
    // answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 53,
    category: "Data Structures and Algorithms",
    question: "What information stored by linked lists is used to implement binary trees?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Value of current node",
    answerTwo: "Pointer to left child",
    answerThree: "Pointer to right child",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 0,
  },
  {
    questionNumber: 54,
    category: "Data Structures and Algorithms",
    question: "Which of the following sorting algorithms is preferred to sort a linked list?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Merge Sort",
    answerTwo: "Quick Sort",
    answerThree: "Insertion",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 1,
    timesIncorrect: 2,
  },
  {
    questionNumber: 55,
    category: "JavaScript",
    question: "What is the use of 'this' keyword in JavaScript?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It refers to the current instance of the object",
    answerTwo: "It refers to the previous instance of the object",
    answerThree: "It refers to the global object",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 56,
    category: "JavaScript",
    question:
      "Which method in an Array object is used to add and/or remove elements from an array?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "filter()",
    answerTwo: "map()",
    answerThree: "splice()",
    answerFour: "reduce()",
    answerFive: "indexOf()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 57,
    category: "Data Structures and Algorithms",
    question: "What data structure uses a Last In First Out (LIFO) method?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Queue",
    answerTwo: "Linked List",
    answerThree: "Array",
    answerFour: "Stack",
    answerFive: "Binary Tree",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 58,
    category: "Data Structures and Algorithms",
    question:
      "In binary search trees, where does a node with a value less than the parent node go?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "To the right",
    answerTwo: "To the root",
    answerThree: "To the left",
    answerFour: "None of the above",
    answerFive: "All of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 59,
    category: "Data Structures and Algorithms",
    question:
      "What is the time complexity of the quicksort algorithm in the average case scenario?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(n^2)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 60,
    category: "Data Structures and Algorithms",
    question:
      "In the Dijkstra's algorithm, which data structure is typically used to store the vertices?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Array",
    answerTwo: "Linked List",
    answerThree: "Stack",
    answerFour: "Heap",
    answerFive: "Hash Table",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 61,
    category: "JavaScript",
    question:
      "What type of JavaScript variable is mutable and allows properties to be added and removed?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Object",
    answerTwo: "Number",
    answerThree: "String",
    answerFour: "Boolean",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 62,
    category: "JavaScript",
    question: "Which method is used to remove the last element from a JavaScript array?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "shift()",
    answerTwo: "pop()",
    answerThree: "push()",
    answerFour: "unshift()",
    answerFive: "splice()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 63,
    category: "Data Structures and Algorithms",
    question: "In hash tables, what technique helps handle collisions?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Binary Search",
    answerTwo: "Dynamic Programming",
    answerThree: "Double Hashing",
    answerFour: "Radix Sort",
    answerFive: "All of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 64,
    category: "Data Structures and Algorithms",
    question: "Which of the following is not a type of sorting algorithm?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Bubble Sort",
    answerTwo: "Prim's Algorithm",
    answerThree: "Heap Sort",
    answerFour: "Quick Sort",
    answerFive: "Insertion Sort",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 65,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of searching for an element in a binary search tree?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n^2)",
    answerTwo: "O(logn)",
    answerThree: "O(n)",
    answerFour: "O(1)",
    answerFive: "O(nlogn)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 66,
    category: "Data Structures and Algorithms",
    question: "What does the following JavaScript code do?",
    codeSnippet: `
    function isBST(node, min = null, max = null) {
      if (node === null) {
          return true;
      }
      if ((min !== null && node.val <= min) || (max !== null && node.val > max)) {
          return false;
      }
      return isBST(node.left, min, node.val) && isBST(node.right, node.val, max);
    }
    `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Returns the sum of all nodes in a binary search tree",
    answerTwo: "Returns a binary search tree after deleting a specific node",
    answerThree: "Checks if a given binary tree is a binary search tree",
    answerFour: "Finds the smallest element in a binary search tree",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 67,
    category: "Data Structures and Algorithms",
    question: "In a binary search tree, which traversal method results in a sorted order of nodes?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Preorder traversal",
    answerTwo: "Postorder traversal",
    answerThree: "Inorder traversal",
    answerFour: "Level-order traversal",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 68,
    category: "Data Structures and Algorithms",
    question:
      "What operation would give a worst-case time complexity of O(n) in a binary search tree?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Insertion",
    answerTwo: "Deletion",
    answerThree: "Search",
    answerFour: "All of the above",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 69,
    category: "Data Structures and Algorithms",
    question: "What does the following JavaScript code do?",
    codeSnippet: `
    function findMin(root) {
      let current = root;
      while (current.left !== null) {
          current = current.left;
      }
      return current.key;
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Returns the minimum element in a binary search tree",
    answerTwo: "Returns the maximum element in a binary search tree",
    answerThree: "Returns the sum of all elements in a binary search tree",
    answerFour: "Returns the height of the binary search tree",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 70,
    category: "Data Structures and Algorithms",
    question:
      "In a binary search tree, the left child is _______ than the parent, and the right child is _______ than the parent.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "larger, smaller",
    answerTwo: "smaller, larger",
    answerThree: "larger, larger",
    answerFour: "smaller, smaller",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 71,
    category: "Data Structures and Algorithms",
    question: "What is the maximum number of nodes at level 'l' in a binary tree?",
    correctAnswerArray: [false, false, false, false, true],
    answerOne: "l",
    answerTwo: "l^2",
    answerThree: "L^2",
    answerFour: "l!",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 72,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of in-order tree traversal in a binary tree?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(logn)",
    answerTwo: "O(n^2)",
    answerThree: "O(n)",
    answerFour: "O(1)",
    answerFive: "O(nlogn)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 73,
    category: "Data Structures and Algorithms",
    question: "What does the following JavaScript code do?",
    codeSnippet: `
    function height(root) {
      if (root === null) {
          return -1;
      } else {
          return Math.max(height(root.left), height(root.right)) + 1;
      }
    }
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Finds the sum of all elements in the binary tree",
    answerTwo: "Finds the height of the binary tree",
    answerThree: "Finds the largest element in the binary tree",
    answerFour: "Checks if the binary tree is balanced",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 74,
    category: "Data Structures and Algorithms",
    question:
      "What is the time complexity of the worst case for insert operation in a Binary Search Tree?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "O(1)",
    answerTwo: "O(logn)",
    answerThree: "O(nlogn)",
    answerFour: "O(n)",
    answerFive: "O(n^2)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 75,
    category: "Data Structures and Algorithms",
    question: "What does the following JavaScript code do?",
    codeSnippet: `
    function isBalanced(root) {
      if (root === null) {
          return true;
      }
      const leftHeight = height(root.left);
      const rightHeight = height(root.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
      );
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Checks if the binary tree is balanced",
    answerTwo: "Returns the height of the binary tree",
    answerThree: "Checks if the binary tree is a binary search tree",
    answerFour: "Finds the largest element in the binary tree",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 76,
    category: "Data Structures and Algorithms",
    question: "What does 'balanced' mean in the context of Binary Search Trees?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "All nodes have two children",
    answerTwo: "The tree is fully filled",
    answerThree: "There are no duplicate nodes",
    answerFour: "The height of the left and right subtrees of every node differ by no more than 1",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 77,
    category: "Data Structures and Algorithms",
    question: "What type of binary tree is used for Huffman coding?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Binary Search Tree",
    answerTwo: "B+ Tree",
    answerThree: "Binary Heap",
    answerFour: "AVL Tree",
    answerFive: "Red-Black Tree",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 78,
    category: "Data Structures and Algorithms",
    question:
      "In the context of Binary Search Trees, what does the term 'in-order predecessor' mean?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "The node with the highest value",
    answerTwo: "The parent node",
    answerThree: "The node with the next lower value",
    answerFour: "The left child of a node",
    answerFive: "The right child of a node",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 79,
    category: "JavaScript",
    question: "What will be the output of the following JavaScript code?",
    codeSnippet: `
    let arr = [10, 20, 30, 40, 50];
    console.log(arr.length);
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "5",
    answerTwo: "50",
    answerThree: "10",
    answerFour: "4",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 80,
    category: "JavaScript",
    question: "What will be the output of the following JavaScript code?",
    codeSnippet: `
    let set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    console.log(set.has(2));
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "False",
    answerTwo: "True",
    answerThree: "3",
    answerFour: "2",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 81,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of adding an element to a JavaScript array?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "O(1)",
    answerTwo: "O(n)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 82,
    category: "Data Structures and Algorithms",
    question: "What data structure is ideally suited for a first-in-first-out (FIFO) process?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Set",
    answerTwo: "Array",
    answerThree: "Stack",
    answerFour: "Queue",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 83,
    category: "Data Structures and Algorithms",
    question: "What will be the output of the following JavaScript code?",
    codeSnippet: `
    let map = new Map();
    map.set('name', 'John');
    console.log(map.get('name'));
    `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "name",
    answerTwo: "undefined",
    answerThree: "John",
    answerFour: "null",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 84,
    category: "Data Structures and Algorithms",
    question: "Which method removes the last element from an array and returns that element?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "shift()",
    answerTwo: "unshift()",
    answerThree: "pop()",
    answerFour: "push()",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 85,
    category: "Data Structures and Algorithms",
    question: "What will be the output of the following JavaScript code?",
    codeSnippet: `
    let arr = [1, 2, 3, 4, 5];
    arr.splice(2, 1);
    console.log(arr);
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "[1, 2, 3, 4, 5]",
    answerTwo: "[1, 2, 4, 5]",
    answerThree: "[1, 3, 4, 5]",
    answerFour: "[2, 3, 4, 5]",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 86,
    category: "Data Structures and Algorithms",
    question: "Which of the following is not a built-in JavaScript data structure?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Linked List",
    answerTwo: "Heap",
    answerThree: "Set",
    answerFour: "Map",
    answerFive: "Array",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 87,
    category: "Data Structures and Algorithms",
    question: "What will be the output of the following JavaScript code?",
    codeSnippet: `
    let stack = [];
    stack.push(1);
    stack.push(2);
    console.log(stack.pop());
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "1",
    answerTwo: "2",
    answerThree: "undefined",
    answerFour: "null",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 88,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity to access an element in a JavaScript array by index?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 89,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    list = [1, 2, 3, 4, 5]
    print(len(list))
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "5",
    answerTwo: "1",
    answerThree: "2",
    answerFour: "3",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 90,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    dict = {'Name': 'Zara', 'Age': 7}
    print("Value : %s" %  dict.get('Age'))
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Name",
    answerTwo: "7",
    answerThree: "Zara",
    answerFour: "None",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 91,
    category: "Python",
    question: "What is the time complexity of appending an element to a Python list?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 92,
    category: "Python",
    question: "What data structure is ideally suited for a first-in-first-out (FIFO) process?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "List",
    answerTwo: "Dict",
    answerThree: "Stack",
    answerFour: "Queue",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 93,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    stack = [3, 4, 5]
    stack.append(6)
    stack.append(7)
    print(stack)
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "[3, 4, 5]",
    answerTwo: "[3, 4, 5, 6, 7]",
    answerThree: "[6, 7]",
    answerFour: "[7, 6, 5, 4, 3]",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 94,
    category: "Python",
    question: "Which method removes the last element from a list and returns that element?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "shift()",
    answerTwo: "unshift()",
    answerThree: "pop()",
    answerFour: "push()",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 95,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    queue = [3, 4, 5]
    queue.append(6)
    queue.append(7)
    queue.pop(0)
    print(queue)
    `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "[3, 4, 5]",
    answerTwo: "[3, 4, 5, 6, 7]",
    answerThree: "[4, 5, 6, 7]",
    answerFour: "[7, 6, 5, 4]",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 96,
    category: "Python",
    question: "Which of the following is not a built-in Python data structure?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Linked List",
    answerTwo: "Heap",
    answerThree: "Set",
    answerFour: "Dict",
    answerFive: "List",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 97,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    stack = [3, 4, 5]
    stack.append(6)
    stack.append(7)
    print(stack.pop())
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "3",
    answerTwo: "7",
    answerThree: "5",
    answerFour: "None",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 98,
    category: "Python",
    question: "What is the time complexity to access an element in a Python list by index?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 99,
    category: "Python",
    question: "How do you define an empty set in Python?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "set()",
    answerTwo: "{}",
    answerThree: "Set()",
    answerFour: "[]",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 100,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    dict = {'a': 1, 'b': 2, 'c': 3}
    print(len(dict))
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "2",
    answerTwo: "3",
    answerThree: "1",
    answerFour: "0",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 101,
    category: "Python",
    question:
      "What is the time complexity of checking whether an element is present in a Python set?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 102,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    dict = {'a': 1, 'b': 2, 'c': 3}
    print('b' in dict)
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "False",
    answerTwo: "True",
    answerThree: "None",
    answerFour: "3",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 103,
    category: "Python",
    question: "Which of the following Python is ordered?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Set",
    answerTwo: "Dictionary",
    answerThree: "Both of the above",
    answerFour: "None of the above",
    answerFive: "List",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 104,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    tup = ('physics', 'chemistry', 1997, 2000)
    print(len(tup))
    `,
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "3",
    answerTwo: "1",
    answerThree: "None",
    answerFour: "4",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 105,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    tup1 = (50,)
    print(type(tup1))
    `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Int",
    answerTwo: "<class 'tuple'>",
    answerThree: "<class 'list'>",
    answerFour: "<class 'str'>",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 106,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    dict = {['Name']: 'Zara', 'Age': 7}
    print("Value : %s" %  dict.get('Name'))
    `,
    correctAnswerArray: [false, false, false, false, true],
    answerOne: "Zara",
    answerTwo: "None",
    answerThree: "Age",
    answerFour: "7",
    answerFive: "TypeError: unhashable type: 'list'",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 107,
    category: "Python",
    question: "What will be the output of the following Python code?",
    codeSnippet: `
    list1 = ['physics', 'chemistry', 1997, 2000]
    list1.remove(1997)
    print(list1)
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "['physics', 'chemistry', 2000]",
    answerTwo: "['physics', 'chemistry']",
    answerThree: "['physics', 'chemistry', 1997]",
    answerFour: "['physics', 'chemistry', 1997, 2000]",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 108,
    category: "Python",
    question: "What is the time complexity to access an element in a Python tuple by index?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(nlogn)",
    answerFour: "O(logn)",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 109,
    category: "Data Structures and Algorithms",
    question: "What does this code snippet accomplish?",
    codeSnippet: `
    const fakeFunctionName = function(head) {
      let prev = null;
      let current = head;
      let next = null;
  
      while(current){
          next = current.next;
          current.next = prev;
          prev = current;
          current = next;
      }
      return prev
  };
    `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Finds middle node",
    answerTwo: "Finds list length",
    answerThree: "Reverses Linked List",
    answerFour: "Adds new nodes",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 110,
    category: "Data Structures and Algorithms",
    question: "What does this code snippet accomplish?",
    codeSnippet: `
    def fakeFunctionName (self, head):
      prev = None
      current = head
      after = None

      while(current):
          after = current.next
          current.next = prev
          prev = current
          current = after
      
      return prev
    `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Finds middle node",
    answerTwo: "Finds list length",
    answerThree: "Reverses Linked List",
    answerFour: "Adds new nodes",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 111,
    category: "Data Structures and Algorithms",
    question: "_______ is a JavaScript method used to combine two or more arrays.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Array.join()",
    answerTwo: "Array.splice()",
    answerThree: "Array.concat()",
    answerFour: "Array.merge()",
    answerFive: "Array.combine()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 112,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, _______ is not a built-in data structure, but can be implemented using objects and pointers.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Array",
    answerTwo: "Stack",
    answerThree: "Queue",
    answerFour: "Linked List",
    answerFive: "Set",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 113,
    category: "Data Structures and Algorithms",
    question:
      "The _______ method is used to find the index of the first occurrence of a specified element in an array.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Array.indexOf()",
    answerTwo: "Array.search()",
    answerThree: "Array.find()",
    answerFour: "Array.positionOf()",
    answerFive: "Array.locate()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 114,
    category: "Data Structures and Algorithms",
    question: "In a binary search tree (BST), all nodes to the left of a node have values _______.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "greater than the node's value",
    answerTwo: "equal to the node's value",
    answerThree: "not related to the node's value",
    answerFour: "less than the node's value",
    answerFive: "greater than or equal to the node's value",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 115,
    category: "Data Structures and Algorithms",
    question: "_______ is a path finding algorithm that uses a heuristic to guide its search.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "A*",
    answerTwo: "Breadth-First Search",
    answerThree: "Depth-First Search",
    answerFour: "Dijkstra's Algorithm",
    answerFive: "Binary Search",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 116,
    category: "Data Structures and Algorithms",
    question:
      "The JavaScript _______ method is used to test whether at least one element in the array passes the test implemented by the provided function.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "every()",
    answerTwo: "filter()",
    answerThree: "some()",
    answerFour: "all()",
    answerFive: "find()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 117,
    category: "Data Structures and Algorithms",
    question:
      "In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far _______ as possible.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "right",
    answerTwo: "up",
    answerThree: "left",
    answerFour: "down",
    answerFive: "middle",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 118,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ method creates a new array populated with the results of calling a provided function on every element in the calling array.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "forEach()",
    answerTwo: "filter()",
    answerThree: "reduce()",
    answerFour: "map()",
    answerFive: "each()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 119,
    category: "Data Structures and Algorithms",
    question: "_______ is a method to traverse every vertex of a graph or tree data structure.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Breadth-First Search",
    answerTwo: "Depth-Last Search",
    answerThree: "Breadth-Last Search",
    answerFour: "Depth-Only Search",
    answerFive: "Shallow Search",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 120,
    category: "Data Structures and Algorithms",
    question:
      "When implementing a linked list in JavaScript, each node typically has properties for _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "next and value",
    answerTwo: "value and next",
    answerThree: "prev and value",
    answerFour: "next and key",
    answerFive: "key and value",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 121,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, _______ is a function that creates a new array with the results of calling a provided function on every element in the calling array.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "forEach()",
    answerTwo: "map()",
    answerThree: "each()",
    answerFour: "filter()",
    answerFive: "reduce()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 122,
    category: "Data Structures and Algorithms",
    question:
      "A graph data structure that uses a parent-child concept, but without cycles, is called a _______.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Cycle Graph",
    answerTwo: "Linked Graph",
    answerThree: "Bi-Directional Graph",
    answerFour: "Tree",
    answerFive: "Rooted Graph",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 123,
    category: "Data Structures and Algorithms",
    question: "_______ is a JavaScript array method that reduces the array to a single value.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "reduceRight()",
    answerTwo: "oncat()",
    answerThree: "flatten()",
    answerFour: "reduce()",
    answerFive: "merge()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 124,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "merge()",
    answerTwo: "ombine()",
    answerThree: "flatten()",
    answerFour: "flat()",
    answerFive: "reduce()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 125,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, a binary tree can be traversed in _______ order, where each node is processed between subtrees.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "post-order",
    answerTwo: "pre-order",
    answerThree: "in-order",
    answerFour: "breadth-first",
    answerFive: "depth-first",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 126,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ array method can be used to determine whether a given element exists in an array, returning a boolean.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "has()",
    answerTwo: "exist()",
    answerThree: "includes()",
    answerFour: "contains()",
    answerFive: "within()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 127,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, to combine the elements of an array into a string, you can use the _______ method.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "collect()",
    answerTwo: "gather()",
    answerThree: "concat()",
    answerFour: "join()",
    answerFive: "group()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 128,
    category: "Data Structures and Algorithms",
    question: "In a binary tree, a node that has no children is known as a _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "root",
    answerTwo: "leaf",
    answerThree: "branch",
    answerFour: "twig",
    answerFive: "stem",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 129,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, to reverse the order of elements in an array, you can use the _______ method.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "turn()",
    answerTwo: "swap()",
    answerThree: "invert()",
    answerFour: "reverse()",
    answerFive: "flip()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 130,
    category: "Data Structures and Algorithms",
    question: "In a doubly linked list, each node has a reference to the _______.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "next node and previous root",
    answerTwo: "previous node and next root",
    answerThree: "next node and previous node",
    answerFour: "next root and previous root",
    answerFive: "previous leaf and next leaf",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 131,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ array method can be used to modify the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "modify()",
    answerTwo: "splice()",
    answerThree: "mutate()",
    answerFour: "shift()",
    answerFive: "edit()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 132,
    category: "Data Structures and Algorithms",
    question:
      "The time complexity of the quicksort algorithm in the worst case scenario is _______.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "O(n)",
    answerTwo: "O(log n)",
    answerThree: "O(n log n)",
    answerFour: "O(n^2)",
    answerFive: "O(n!)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 133,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ array method can be used to remove the first item from an array.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "remove()",
    answerTwo: "shift()",
    answerThree: "pop()",
    answerFour: "extract()",
    answerFive: "delete()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 134,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, to copy an array, you can use the _______ method, which creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "splice()",
    answerTwo: "slice()",
    answerThree: "cut()",
    answerFour: "copy()",
    answerFive: "duplicate()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 135,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, to merge two or more objects into a new object without modifying the original objects, you can use the _______ method.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "join()",
    answerTwo: "oncat()",
    answerThree: "Object.assign()",
    answerFour: "Object.merge()",
    answerFive: "Object.combine()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 136,
    category: "Data Structures and Algorithms",
    question:
      "The time complexity of accessing an item in a JavaScript object by its key is _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(n log n)",
    answerFour: "O(n^2)",
    answerFive: "O(log n)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 137,
    category: "Data Structures and Algorithms",
    question:
      "The _______ method is used in JavaScript to execute a function once for each array element, and returns a new array with the modified items.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "change()",
    answerTwo: "map()",
    answerThree: "transform()",
    answerFour: "modify()",
    answerFive: "iterate()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 138,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the time complexity of searching for an item in an unsorted array is _______.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(log n)",
    answerTwo: "O(1)",
    answerThree: "O(n)",
    answerFour: "O(n^2)",
    answerFive: "O(n log n)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 139,
    category: "Data Structures and Algorithms",
    question: "In JavaScript, the _______ method can be used to add items to the end of an array.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "push()",
    answerTwo: "append()",
    answerThree: "add()",
    answerFour: "insert()",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 140,
    category: "Data Structures and Algorithms",
    question: "In JavaScript, the _______ method can be used to sort an array.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "order()",
    answerTwo: "arrange()",
    answerThree: "sort()",
    answerFour: "sequence()",
    answerFive: "rank()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 141,
    category: "Data Structures and Algorithms",
    question: "In a JavaScript object, keys are always of type _______.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "number",
    answerTwo: "object",
    answerThree: "boolean",
    answerFour: "string",
    answerFive: "array",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 142,
    category: "Data Structures and Algorithms",
    question: "In a JavaScript Set object, each value must be _______.",
    correctAnswerArray: [false, false, false, true, true],
    answerOne: "a string",
    answerTwo: "a number",
    answerThree: "an array",
    answerFour: "an object",
    answerFive: "unique",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 143,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, to return the first index at which a given element can be found in the array, you can use the _______ method.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "first()",
    answerTwo: "locate()",
    answerThree: "position()",
    answerFour: "indexOf()",
    answerFive: "indexAt()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 144,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ method returns a new string with some or all matches of a pattern replaced by a replacement.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "change()",
    answerTwo: "switch()",
    answerThree: "alter()",
    answerFour: "replace()",
    answerFive: "swap()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 145,
    category: "Data Structures and Algorithms",
    question:
      "In JavaScript, the _______ method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "compress()",
    answerTwo: "ombine()",
    answerThree: "mingle()",
    answerFour: "reduce()",
    answerFive: "join()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 146,
    category: "Python",
    question: "In Python, to add an item to the end of the list, you can use the _______ method.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "push()",
    answerTwo: "append()",
    answerThree: "insert()",
    answerFour: "add()",
    answerFive: "attach()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 147,
    category: "Python",
    question:
      "In Python, the _______ data structure is a collection which is unordered, changeable and indexed. It has no duplicate elements.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "tuple",
    answerTwo: "list",
    answerThree: "array",
    answerFour: "set",
    answerFive: "dictionary",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 148,
    category: "Python",
    question:
      "In Python, the _______ function can be used to return the number of times a specified value appears in the string.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "appear()",
    answerTwo: "count()",
    answerThree: "number()",
    answerFour: "total()",
    answerFive: "quantity()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 149,
    category: "Python",
    question:
      "In Python, a _______ is a collection which is ordered and unchangeable. It allows duplicate members.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "tuple",
    answerTwo: "set",
    answerThree: "dictionary",
    answerFour: "list",
    answerFive: "array",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 150,
    category: "Python",
    question:
      "In Python, the _______ function can be used to return a string which is a concatenation of all strings in an iterable.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "merge()",
    answerTwo: "attach()",
    answerThree: "join()",
    answerFour: "combine()",
    answerFive: "link()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 151,
    category: "Python",
    question:
      "In Python, the time complexity of searching for an item in a sorted list using binary search is _______.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "O(n)",
    answerTwo: "O(1)",
    answerThree: "O(n^2)",
    answerFour: "O(log n)",
    answerFive: "O(n log n)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 152,
    category: "Python",
    question:
      "In Python, the _______ data structure is a collection which is unordered, changeable and indexed. It does not allow duplicate values.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "set",
    answerTwo: "tuple",
    answerThree: "dictionary",
    answerFour: "list",
    answerFive: "array",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 153,
    category: "Python",
    question:
      "In Python, a _______ is a collection which is ordered and changeable. It allows duplicate members.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "tuple",
    answerTwo: "list",
    answerThree: "dictionary",
    answerFour: "set",
    answerFive: "array",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 154,
    category: "Python",
    question:
      "In Python, the _______ method returns a string with a certain number of leading characters removed. The leading characters to be removed are specified as parameters.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "remove()",
    answerTwo: "strip()",
    answerThree: "lstrip()",
    answerFour: "delete()",
    answerFive: "cut()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 155,
    category: "Python",
    question:
      "In Python, the _______ function can be used to return the length (the number of items) of an object.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "len()",
    answerTwo: "size()",
    answerThree: "quantity()",
    answerFour: "amount()",
    answerFive: "total()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },

  {
    questionNumber: 156,
    category: "React and React-Redux",
    question:
      "In React 18, ________ lets you prepare multiple versions of the UI in memory and switch between them without causing a re-render.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Component swapping",
    answerTwo: "React Server Components",
    answerThree: "React Virtualization",
    answerFour: "React State Transition",
    answerFive: "React Memory Buffer",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 157,
    category: "React and React-Redux",
    question:
      "The _______ method is used in React and React-Redux to wrap a root and its descendants so updates to them can be batched together.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "batchUpdate()",
    answerTwo: "createRoot()",
    answerThree: "root()",
    answerFour: "rootBatch()",
    answerFive: "createBatch()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 158,
    category: "React and React-Redux",
    question:
      "React 18 introduces _______ that helps to automatically batch multiple state updates into a single render pass.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Render Optimization",
    answerTwo: "Single Pass Rendering",
    answerThree: "automatic batching",
    answerFour: "State Aggregation",
    answerFive: "Batch State Update",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 159,
    category: "React and React-Redux",
    question:
      "React 18 introduced a new API called ________ that allows developers to suspend and resume rendering on a per-component basis.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "renderControl()",
    answerTwo: "suspense",
    answerThree: "renderPause()",
    answerFour: "renderSuspense()",
    answerFive: "suspend()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 160,
    category: "React and React-Redux",
    question:
      "In React and React-Redux, _______ can be used for controlling the visual loading sequence of a component.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "componentLoading()",
    answerTwo: "loadingControl()",
    answerThree: "startTransition",
    answerFour: "componentSequence()",
    answerFive: "startLoading()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 161,
    category: "React and React-Redux",
    question:
      "The _______ API in React and React-Redux is used to inform React about a state update that can be interrupted by other more important updates.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "intermediateState()",
    answerTwo: "interruptibleUpdate()",
    answerThree: "startTransition()",
    answerFour: "prioritizeUpdate()",
    answerFive: "stateTransition()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 162,
    category: "React and React-Redux",
    question:
      "In React and React-Redux, _______ is a new type of component that can be rendered on the server and then sent to the client as HTML.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "HTML Component",
    answerTwo: "Server Component",
    answerThree: "Transfer Component",
    answerFour: "Server HTML Component",
    answerFive: "Remote Component",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 163,
    category: "React and React-Redux",
    question:
      "In React 18, _______ is the way to create a root for a React tree, used as a replacement for `ReactDOM.render()`.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "React.create()",
    answerTwo: "React.initialize()",
    answerThree: "ReactDOM.createRoot()",
    answerFour: "React.root()",
    answerFive: "ReactDOM.initializeRoot()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 164,
    category: "React and React-Redux",
    question:
      "React 18 introduces a built-in _______ API that allows React to avoid unnecessary layout computations and browser renders.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Computation Manager",
    answerTwo: "concurrent rendering",
    answerThree: "Render Optimizer",
    answerFour: "Layout Manager",
    answerFive: "Browser Renderer",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 165,
    category: "React and React-Redux",
    question:
      "React 18's _______ enables select parts of your UI to update and render immediately, while others update later.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Render Prioritization",
    answerTwo: "Selective Rendering",
    answerThree: "Update Prioritization",
    answerFour: "selective hydration",
    answerFive: "UI Segmenting",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 166,
    category: "React and React-Redux",
    question: "In React 18, _______ let you split a rendering task into multiple smaller tasks.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "React.startTransition()",
    answerTwo: "React.split()",
    answerThree: "React.fragment()",
    answerFour: "React.parts()",
    answerFive: "React.task()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 167,
    category: "React and React-Redux",
    question:
      "React 18 introduced the _______ method that enables you to block a transition from finishing until some condition is met.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "blockTransition()",
    answerTwo: "holdTransition()",
    answerThree: "suspendTransition()",
    answerFour: "useTransition()",
    answerFive: "delayTransition()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 168,
    category: "React and React-Redux",
    question:
      "React 18's _______ mechanism allows users to interact with the page during a large update, providing a smoother user experience.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Interruptible Rendering",
    answerTwo: "UI Decoupling",
    answerThree: "User Interactivity",
    answerFour: "Update Pausing",
    answerFive: "Render Throttling",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 169,
    category: "React and React-Redux",
    question:
      "In React 18, _______ is a feature that allows you to defer rendering for certain parts of your application to improve perceived performance.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Defer Rendering",
    answerTwo: "Delay Rendering",
    answerThree: "suspense",
    answerFour: "Postpone Rendering",
    answerFive: "Render Later",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 171,
    category: "React and React-Redux",
    question:
      "In React 17, the new JSX Transform eliminated the need for ________ in your JSX code.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "React.createElement()",
    answerTwo: "React.JSX()",
    answerThree: "React.transformJSX()",
    answerFour: "React.compileJSX()",
    answerFive: "React.generateJS()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 172,
    category: "React and React-Redux",
    question:
      "In React-Redux, _______ is a function that allows you to extract data from the Redux store state.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "useData()",
    answerTwo: "useSelector()",
    answerThree: "useState()",
    answerFour: "useStore()",
    answerFive: "useExtract()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 173,
    category: "React and React-Redux",
    question: "In React-Redux, the _______ hook dispatches actions to the store.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "useDispatchAction()",
    answerTwo: "useDispatch()",
    answerThree: "useAction()",
    answerFour: "useStoreDispatch()",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 174,
    category: "React and React-Redux",
    question:
      "In React 18, _______ lets you prepare a new version of a component in memory, which can replace the current one on screen when ready.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "usePrepare()",
    answerTwo: "useTransition()",
    answerThree: "useVersion()",
    answerFour: "useReplace()",
    answerFive: "useComponent()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 175,
    category: "React and React-Redux",
    question:
      "In React-Redux, _______ is a higher order function that connects a React component to the Redux store.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "link()",
    answerTwo: "onnectRedux()",
    answerThree: "connect()",
    answerFour: "storeLink()",
    answerFive: "connectStore()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 176,
    category: "React and React-Redux",
    question:
      "In React 18, the _______ API allows you to start a transition, providing a way to coordinate changes to your components with different levels of priority.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "useChange()",
    answerTwo: "useShift()",
    answerThree: "startTransition()",
    answerFour: "useTransition()",
    answerFive: "startChange()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 177,
    category: "React and React-Redux",
    question:
      "In React-Redux, the _______ is a function of the store that allows you to dispatch actions.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "action()",
    answerTwo: "dispatch()",
    answerThree: "send()",
    answerFour: "pushAction()",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 178,
    category: "React and React-Redux",
    question:
      "In React, _______ are used to split components into non-visual logic and visual parts.",
    correctAnswerArray: [false, false, true, false, true],
    answerOne: "Dividers",
    answerTwo: "Decomposers",
    answerThree: "Hooks",
    answerFour: "Breakers",
    answerFive: "Splitting Tools",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 179,
    category: "React and React-Redux",
    question:
      "In React, _______ is a concept that allows a component to maintain internal state data, independently managing it itself.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Internal Data Management",
    answerTwo: "State",
    answerThree: "Component Data",
    answerFour: "Self-Containment",
    answerFive: "Data Independence",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 180,
    category: "React and React-Redux",
    question: "In React-Redux, the _______ is the central repository of all state data.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Data Center",
    answerTwo: "Store",
    answerThree: "State Repository",
    answerFour: "Data Repository",
    answerFive: "State Center",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 181,
    category: "React and React-Redux",
    question: "_______ hook lets you read the state from the Redux store.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "useSelector()",
    answerTwo: "useDispatch()",
    answerThree: "useReact()",
    answerFour: "useStore()",
    answerFive: "useContext()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 182,
    category: "React and React-Redux",
    question: "React components are often written in a format known as _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "JavaScriptXML",
    answerTwo: "JSX",
    answerThree: "HTMLJS",
    answerFour: "JavaScriptHTML",
    answerFive: "Java Scripting XML",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 183,
    category: "React and React-Redux",
    question: "React components defined as classes have additional features, such as _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "UseState",
    answerTwo: "Lifecycle methods",
    answerThree: "UseContext",
    answerFour: "RenderProps",
    answerFive: "UseEffect",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 184,
    category: "React and React-Redux",
    question: "The _______ hook is used to manage local state of a function component in React.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "useState()",
    answerTwo: "useClass()",
    answerThree: "useStore()",
    answerFour: "useVariable()",
    answerFive: "useObject()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 185,
    category: "React and React-Redux",
    question: "In React-Redux, a _______ is a function that creates an action object.",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Action Creator",
    answerTwo: "Store Creator",
    answerThree: "Object Maker",
    answerFour: "Action Producer",
    answerFive: "State Generator",
    timesCorrect: 0,
    timesIncorrect: 0,
  },

  {
    questionNumber: 186,
    category: "Express.js",
    question: "Express.js is a _______ web application framework for Node.js.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "modular",
    answerTwo: "structured",
    answerThree: "systematic",
    answerFour: "minimalist",
    answerFive: "simplified",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 187,
    category: "Express.js",
    question:
      "Express.js provides a robust set of features for web and mobile applications including a myriad of HTTP _______ methods and middleware.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "processing",
    answerTwo: "helper",
    answerThree: "handler",
    answerFour: "responding",
    answerFive: "interaction",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 188,
    category: "Express.js",
    question:
      "In Express.js, _______ are functions that have access to the request object, the response object, and the next function in the application's request-response cycle.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "handlers",
    answerTwo: "processors",
    answerThree: "middleware functions",
    answerFour: "responders",
    answerFive: "translators",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 189,
    category: "Express.js",
    question:
      "In Express.js, the order of _______ defined is very important as they are executed in the order they are defined.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "responses",
    answerTwo: "requests",
    answerThree: "middleware",
    answerFour: "routes",
    answerFive: "callbacks",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 190,
    category: "Express.js",
    question:
      "To set up a basic server in Express.js, you would use the _______ method of an Express app instance.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "start",
    answerTwo: "run",
    answerThree: "serve",
    answerFour: "listen",
    answerFive: "init",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 191,
    category: "Express.js",
    question: "In Express.js, app.use() is used to add _______ to your application.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "features",
    answerTwo: "functions",
    answerThree: "middleware",
    answerFour: "controllers",
    answerFive: "listeners",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 192,
    category: "Express.js",
    question:
      "Express.js uses the concept of routing to determine how an application responds to a client request to a particular _______.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "address",
    answerTwo: "endpoint",
    answerThree: "URL",
    answerFour: "handler",
    answerFive: "server",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 193,
    category: "Express.js",
    question:
      "In Express.js, res.json() is a function that sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON _______.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "object",
    answerTwo: "file",
    answerThree: "string",
    answerFour: "format",
    answerFive: "output",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 194,
    category: "Express.js",
    question:
      "Express.js makes it easy to define routes of your application. A route can be as simple as a path and a _______.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "URL",
    answerTwo: "response",
    answerThree: "handler",
    answerFour: "method",
    answerFive: "directory",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 195,
    category: "Express.js",
    question:
      "In Express.js, you can use template engines to generate HTML content on the server side based on your views. Which of the following are such engines?",
    correctAnswerArray: [true, true, true, true, true],
    answerOne: "Pug",
    answerTwo: "Mustache",
    answerThree: "EJS",
    answerFour: "Blade",
    answerFive: "Handlebars",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 196,
    category: "Express.js",
    question: "What HTTP method is typically used to update data?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "PUT",
    answerTwo: "GET",
    answerThree: "POST",
    answerFour: "DELETE",
    answerFive: "FETCH",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 197,
    category: "Express.js",
    question: "Which Express.js function ends the request-response cycle?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "app.use()",
    answerTwo: "app.listen()",
    answerThree: "res.send()",
    answerFour: "app.get()",
    answerFive: "app.post()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 198,
    category: "Express.js",
    question: "To receive form data in Express.js, you can use the _______ middleware.",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "urlencoded",
    answerTwo: "body-parser",
    answerThree: "query-parser",
    answerFour: "data-parser",
    answerFive: "request-parser",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 199,
    category: "Express.js",
    question:
      "What would you use to define a variable that can be used in all views in Express.js?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "app.get()",
    answerTwo: "app.set()",
    answerThree: "app.variable()",
    answerFour: "app.locals",
    answerFive: "app.global()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 200,
    category: "Express.js",
    question: "Express.js is a _______ web application framework for Node.js.",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "modular",
    answerTwo: "structured",
    answerThree: "systematic",
    answerFour: "minimalist",
    answerFive: "simplified",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 201,
    category: "Express.js",
    question:
      "In Express.js, app.route() is a convenient method to define routes that belong to the same _______.",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "domain",
    answerTwo: "path",
    answerThree: "route path",
    answerFour: "group",
    answerFive: "callback",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 202,
    category: "Express.js",
    question: "What HTTP method is typically used to read data?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "PUT",
    answerTwo: "GET",
    answerThree: "POST",
    answerFour: "DELETE",
    answerFive: "FETCH",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 203,
    category: "Express.js",
    question:
      "What would you use to define a variable that can be used only in the current request-response cycle in Express.js?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "res.variable()",
    answerTwo: "res.set()",
    answerThree: "res.get()",
    answerFour: "res.locals",
    answerFive: "res.global()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 204,
    category: "Express.js",
    question: "What HTTP method is typically used to create data?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "PUT",
    answerTwo: "GET",
    answerThree: "POST",
    answerFour: "DELETE",
    answerFive: "FETCH",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 205,
    category: "Express.js",
    question: "In Express.js, what is the correct syntax for handling errors using middleware?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "app.use((err, req, res, next) => {})",
    answerTwo: "app.use((err, req, res, next) => {})",
    answerThree: "app.error((err, req, res, next) => {})",
    answerFour: "app.handle((err, req, res, next) => {})",
    answerFive: "app.catch((err, req, res, next) => {})",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 206,
    category: "Express.js",
    question: "In Express.js, how can you serve static files?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "app.static()",
    answerTwo: "app.file()",
    answerThree: "app.use(express.static())",
    answerFour: "app.serve()",
    answerFive: "app.resource()",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 207,
    category: "Express.js",
    question: "What does the 'next' argument represent in Express.js middleware?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "The next middleware in the application",
    answerTwo: "The callback function to call the next middleware in the stack",
    answerThree: "The next request that comes into the server",
    answerFour: "The next response to be sent to the client",
    answerFive: "The next route to be executed",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 208,
    category: "Express.js",
    question: "What HTTP method is typically used to delete data?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "PUT",
    answerTwo: "GET",
    answerThree: "POST",
    answerFour: "DELETE",
    answerFive: "FETCH",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 209,
    category: "Express.js",
    question: "In Express.js, how can you handle 404 errors that have no other route handlers?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "app.catch(404, (req, res, next) => {})",
    answerTwo: "app.error(404, (req, res, next) => {})",
    answerThree: "app.handle(404, (req, res, next) => {})",
    answerFour: "app.use((req, res, next) => {})",
    answerFive: "app.get(404, (req, res, next) => {})",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 210,
    category: "Express.js",
    question:
      "In Express.js, how can you handle all HTTP methods at a specific route using the same function?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "app.get('*', (req, res, next) => {})",
    answerTwo: "app.use('*', (req, res, next) => {})",
    answerThree: "app.route('*', (req, res, next) => {})",
    answerFour: "app.all('*', (req, res, next) => {})",
    answerFive: "app.handle('*', (req, res, next) => {})",
    timesCorrect: 0,
    timesIncorrect: 0,
  },

  //new questions about different problem solving techniques 10/19/23

  {
    questionNumber: 211,
    category: "Data Structures and Algorithms",
    question:
      "Which problem-solving technique is often used to solve array or list-based problems that require subarrays or substrings of a certain length or condition?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Sliding Window",
    answerTwo: "Divide and Conquer",
    answerThree: "Greedy Method",
    answerFour: "Backtracking",
    answerFive: "Dynamic Programming",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 212,
    category: "Data Structures and Algorithms",
    question: "What is the primary advantage of the sliding window technique?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "It always finds the optimal solution.",
    answerTwo: "It reduces space complexity to O(1).",
    answerThree: "It reduces time complexity by avoiding re-computation.",
    answerFour: "It works for non-linear data structures.",
    answerFive: "It guarantees a solution for every problem.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 213,
    category: "Data Structures and Algorithms",
    question: "In the sliding window technique, if the condition is not met, what should be done?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Reset the window.",
    answerTwo: "Expand the window.",
    answerThree: "Shrink the window.",
    answerFour: "Move the window to the right by two positions.",
    answerFive: "Reverse the window.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 214,
    category: "Data Structures and Algorithms",
    question: "Which type of problems is the sliding window technique NOT suitable for?",
    correctAnswerArray: [false, false, false, false, true],
    answerOne: "Maximum sum subarray of size K.",
    answerTwo: "Smallest subarray with a given sum.",
    answerThree: "Longest substring with K distinct characters.",
    answerFour: "Fruits into baskets.",
    answerFive: "Finding shortest path in a graph.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 215,
    category: "Data Structures and Algorithms",
    question: "In the sliding window technique, what does 'window size' refer to?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "The size of the input array or list.",
    answerTwo: "The number of consecutive elements considered at any given time.",
    answerThree: "The total number of elements in the array or list.",
    answerFour: "The maximum capacity of an array or list.",
    answerFive: "The number of distinct elements in the array or list.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 216,
    category: "Data Structures and Algorithms",
    question: "Which problem can be efficiently solved using a variable size sliding window?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Finding the middle element of a linked list.",
    answerTwo: "Longest substring with no repeating characters.",
    answerThree: "Balanced parentheses validation.",
    answerFour: "Inverting a binary tree.",
    answerFive: "Depth first traversal of a graph.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 217,
    category: "Data Structures and Algorithms",
    question:
      "For a given array, what type of sliding window is typically used when the size of the window is not provided?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Fixed size sliding window.",
    answerTwo: "Variable size sliding window.",
    answerThree: "Reversing sliding window.",
    answerFour: "Cyclic sliding window.",
    answerFive: "Mirrored sliding window.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 218,
    category: "Data Structures and Algorithms",
    question: "What is the primary challenge when implementing the sliding window technique?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Choosing the correct data structure.",
    answerTwo: "Determining the starting position of the window.",
    answerThree: "Identifying when to expand or shrink the window.",
    answerFour: "Avoiding array out-of-bounds errors.",
    answerFive: "Deciding the maximum size of the window.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 219,
    category: "Data Structures and Algorithms",
    question:
      "In the context of the sliding window technique, what does 'shrinking the window' typically imply?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Moving the starting point of the window to the right.",
    answerTwo: "Decreasing the total size of the input data.",
    answerThree: "Moving the ending point of the window to the left.",
    answerFour: "Resetting the window to its initial state.",
    answerFive: "Reversing the order of elements within the window.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 220,
    category: "Data Structures and Algorithms",
    question:
      "Which auxiliary data structure is often used with the sliding window technique to keep track of distinct elements within the window?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Array",
    answerTwo: "HashSet or Set",
    answerThree: "Queue",
    answerFour: "Stack",
    answerFive: "Binary Search Tree",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 221,
    category: "Data Structures and Algorithms",
    question:
      "In sliding window problems, what's a common approach to handle negative numbers in the input?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Treat them like any other number and adjust the window accordingly.",
    answerTwo: "Remove them from the input before processing.",
    answerThree: "Convert them to positive numbers.",
    answerFour: "Ignore the negative numbers while processing.",
    answerFive: "Use a separate window for negative numbers.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 222,
    category: "Data Structures and Algorithms",
    question: "In which scenario would a fixed-size sliding window be the most appropriate?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Finding the longest substring without repeating characters.",
    answerTwo: "Finding the maximum sum of any contiguous subarray of size K.",
    answerThree: "Finding the smallest subarray with a sum greater than a given value.",
    answerFour: "Finding all anagrams of a pattern in a string.",
    answerFive: "Finding the longest substring with at most two distinct characters.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 223,
    category: "Data Structures and Algorithms",
    question: "Which of the following is not a common use case for the sliding window technique?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Finding the average of all contiguous subarrays of size K.",
    answerTwo: "Finding the maximum sum subarray of size K.",
    answerThree: "Performing a depth-first search on a graph.",
    answerFour:
      "Finding the length of the longest substring with no more than K distinct characters.",
    answerFive: "Finding all substrings of a string that are permutations of another string.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 224,
    category: "Data Structures and Algorithms",
    question:
      "For an array of positive numbers, if a problem requires finding a contiguous subarray that meets a certain condition, what type of sliding window is likely needed?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Fixed size sliding window.",
    answerTwo: "Variable size sliding window.",
    answerThree: "Reversing sliding window.",
    answerFour: "Cyclic sliding window.",
    answerFive: "Mirrored sliding window.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 225,
    category: "Data Structures and Algorithms",
    question:
      "In a problem where you need to identify all contiguous subarrays of a given size that meet a specific criterion, which technique would you use?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Sliding window technique.",
    answerTwo: "Divide and conquer.",
    answerThree: "Greedy algorithm.",
    answerFour: "Backtracking.",
    answerFive: "Depth-first search.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 226,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
    function compute(arr, K) {
      let maxVal = Number.MIN_SAFE_INTEGER;
      let currentSum = 0;
      for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];
        if (i >= K) {
          currentSum -= arr[i - K];
        }
        maxVal = Math.max(maxVal, currentSum);
      }
      return maxVal;
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Determines the maximum sum of any contiguous subarray of size K.",
    answerTwo: "Calculates the minimum sum of any contiguous subarray of size K.",
    answerThree: "Finds the subarray with the most repeating numbers.",
    answerFour: "Evaluates the average of all subarrays of size K.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 227,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet aim to achieve?",
    codeSnippet: `
    function processArray(nums, S) {
      let windowSum = 0;
      let minLength = Number.MAX_SAFE_INTEGER;
      let windowStart = 0;
      for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
        windowSum += nums[windowEnd];
        while (windowSum >= S) {
          minLength = Math.min(minLength, windowEnd - windowStart + 1);
          windowSum -= nums[windowStart];
          windowStart++;
        }
      }
      return minLength !== Number.MAX_SAFE_INTEGER ? minLength : 0;
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "Identifies the minimum length of a contiguous subarray with a sum greater than or equal to S.",
    answerTwo: "Finds the maximum length of a contiguous subarray with a sum less than S.",
    answerThree: "Calculates the total sum of the entire array.",
    answerFour: "Determines the average sum of all subarrays.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 228,
    category: "Data Structures and Algorithms",
    question: "What is the goal of the following code snippet?",
    codeSnippet: `
    function evaluateStrings(str, pattern) {
      let charFrequency = {};
      let matched = 0;
      let windowStart = 0;
      for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        if (!charFrequency[char]) {
          charFrequency[char] = 0;
        }
        charFrequency[char]++;
      }
      for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const rightChar = str[windowEnd];
        if (charFrequency[rightChar] !== undefined) {
          charFrequency[rightChar]--;
          if (charFrequency[rightChar] === 0) {
            matched++;
          }
        }
        if (matched === Object.keys(charFrequency).length) {
          return true;
        }
        if (windowEnd >= pattern.length - 1) {
          const leftChar = str[windowStart];
          windowStart++;
          if (charFrequency[leftChar] !== undefined) {
            if (charFrequency[leftChar] === 0) {
              matched--;
            }
            charFrequency[leftChar]++;
          }
        }
      }
      return false;
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "Checks if any permutation of the pattern exists as a substring in the given string.",
    answerTwo: "Finds all substrings in the given string that match the pattern.",
    answerThree: "Counts the number of times the pattern appears in the string.",
    answerFour: "Reverses the order of characters in the string based on the pattern.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 229,
    category: "Data Structures and Algorithms",
    question: "What is the primary objective of the following code snippet?",
    codeSnippet: `
    function analyzeData(nums, k) {
      let result = [];
      let sum = 0;
      let windowStart = 0;
      for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
        sum += nums[windowEnd];
        if (windowEnd >= k - 1) {
          result.push(sum / k);
          sum -= nums[windowStart];
          windowStart++;
        }
      }
      return result;
    }
    `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Calculates the average of every 'k' consecutive numbers in the array 'nums'.",
    answerTwo: "Finds the maximum sum of any contiguous subarray of size 'k' in the array 'nums'.",
    answerThree: "Identifies the subarray with the most repeating numbers.",
    answerFour: "Calculates the sum of all subarrays of size 'k'.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 230,
    category: "Data Structures and Algorithms",
    question: "Which technique is commonly used to reverse the elements of an array in-place?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Two Pointers technique.",
    answerTwo: "Recursive traversal.",
    answerThree: "Sliding window technique.",
    answerFour: "Depth-first search.",
    answerFive: "Binary search.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 231,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet achieve?",
    codeSnippet: `
      function randomFunctionName(arr, sum) {
        let left = 0;
        let right = arr.length - 1;
        while (left < right) {
          const currentSum = arr[left] + arr[right];
          if (currentSum === sum) return true;
          if (currentSum < sum) left++;
          else right--;
        }
        return false;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Checks if there's a pair in the array that adds up to the given sum.",
    answerTwo: "Finds the maximum sum of any two numbers in the array.",
    answerThree: "Computes the average of all pairs of numbers in the array.",
    answerFour: "Determines if the array contains any duplicate numbers.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 232,
    category: "Data Structures and Algorithms",
    question: "In which scenario would you use the two-pointer technique?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Finding a continuous subarray that sums to a target value.",
    answerTwo: "Determining the height of a binary tree.",
    answerThree: "Computing the factorial of a number.",
    answerFour: "Performing a depth-first traversal on a graph.",
    answerFive: "Sorting an array using merge sort.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 233,
    category: "Data Structures and Algorithms",
    question: "What is the primary objective of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(nums) {
        if (nums.length === 0) return 0;
        let i = 0;
        for (let j = 1; j < nums.length; j++) {
          if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
          }
        }
        return i + 1;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Removes duplicates from a sorted array and returns the new length.",
    answerTwo: "Counts the number of unique elements in the array.",
    answerThree: "Finds the most frequent element in the array.",
    answerFour: "Reverses the order of the array elements.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 234,
    category: "Data Structures and Algorithms",
    question:
      "When using the two-pointer technique on a linked list to detect cycles, what are the commonly used names for the pointers?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Slow and Fast pointers.",
    answerTwo: "Left and Right pointers.",
    answerThree: "Start and End pointers.",
    answerFour: "First and Last pointers.",
    answerFive: "Parent and Child pointers.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 235,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet achieve?",
    codeSnippet: `
      function randomFunctionName(nums) {
        let pos = 0;
        for (let i = 0; i < nums.length; i++) {
          if (nums[i] !== 0) {
            nums[pos] = nums[i];
            if (i !== pos) nums[i] = 0;
            pos++;
          }
        }
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "Moves all zeroes in the array to the end while maintaining the order of the other elements.",
    answerTwo: "Counts the number of zeroes in the array.",
    answerThree: "Finds the position of the first zero in the array.",
    answerFour: "Replaces all zeroes in the array with ones.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 236,
    category: "Data Structures and Algorithms",
    question: "Which technique would you use to determine if a string is a palindrome?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Two Pointers technique.",
    answerTwo: "Recursive traversal.",
    answerThree: "Dynamic programming.",
    answerFour: "Breadth-first search.",
    answerFive: "Divide and conquer.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 237,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(s) {
        let maxLen = -1;
        for (let i = 0; i < s.length; i++) {
          let j = s.lastIndexOf(s[i]);
          if (j !== i) {
            maxLen = Math.max(maxLen, j - i - 1);
          }
        }
        return maxLen;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Finds the maximum length between two identical characters in the string.",
    answerTwo: "Counts the number of unique characters in the string.",
    answerThree: "Reverses the order of characters in the string.",
    answerFour: "Determines if the string is a palindrome.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 238,
    category: "Data Structures and Algorithms",
    question:
      "Which technique would be suitable for finding the middle element of a linked list in a single pass?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Two Pointers technique.",
    answerTwo: "Depth-first search.",
    answerThree: "Dynamic programming.",
    answerFour: "Breadth-first search.",
    answerFive: "Divide and conquer.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 239,
    category: "Data Structures and Algorithms",
    question: "How can you determine if a given array has a cycle using the two-pointer technique?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "By iterating through the array with a slow and a fast pointer and checking if they meet.",
    answerTwo: "By sorting the array first and then checking for duplicate values.",
    answerThree: "By using a hash table to store visited elements.",
    answerFour: "By performing a binary search on the array.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 240,
    category: "Data Structures and Algorithms",
    question: "Which technique is commonly used to detect cycles in a linked list?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Fast and Slow pointers technique.",
    answerTwo: "Sliding window technique.",
    answerThree: "Depth-first search.",
    answerFour: "Divide and conquer.",
    answerFive: "Greedy algorithm.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 241,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(head) {
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow === fast) {
            return true;
          }
        }
        return false;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Determines if a linked list has a cycle.",
    answerTwo: "Reverses the linked list.",
    answerThree: "Finds the middle element of the linked list.",
    answerFour: "Calculates the length of the linked list.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 242,
    category: "Data Structures and Algorithms",
    question:
      "When using the fast and slow pointer technique on a linked list, what is the main advantage?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Detecting cycles without using extra space.",
    answerTwo: "Speeding up the traversal of the linked list.",
    answerThree: "Finding the starting node of the cycle.",
    answerFour: "Merging two sorted linked lists.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 243,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet achieve?",
    codeSnippet: `
      function randomFunctionName(head) {
        if (!head) return null;
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
          slow = slow.next;
          fast = fast.next.next;
          if (slow === fast) {
            break;
          }
        }
        if (slow !== fast) return null;
        slow = head;
        while (slow !== fast) {
          slow = slow.next;
          fast = fast.next;
        }
        return slow;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Finds the starting node of the cycle in the linked list.",
    answerTwo: "Calculates the length of the cycle in the linked list.",
    answerThree: "Reverses the linked list.",
    answerFour: "Detects if a linked list has a cycle.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 244,
    category: "Data Structures and Algorithms",
    question:
      "How can the fast and slow pointer technique help in finding the middle of a linked list?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "By moving the slow pointer one step and the fast pointer two steps at a time.",
    answerTwo: "By moving both pointers at the same speed until the end is reached.",
    answerThree: "By reversing the linked list using both pointers.",
    answerFour: "By moving the fast pointer one step and the slow pointer two steps at a time.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 245,
    category: "Data Structures and Algorithms",
    question: "What does the following code snippet achieve?",
    codeSnippet: `
      function randomFunctionName(nums) {
        let left = 0, right = nums.length - 1;
        while (left < right) {
          let mid = Math.floor((left + right) / 2);
          if (nums[mid] % 2 === 0) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        return nums[left];
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Finds the first odd number in a sorted array where all numbers before are even.",
    answerTwo: "Finds the last even number in the array.",
    answerThree: "Finds the middle number of the array.",
    answerFour: "Searches for a specific number in the array.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 246,
    category: "Data Structures and Algorithms",
    question:
      "Why is the fast and slow pointer technique also referred to as the 'hare and tortoise' technique?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "Because the fast pointer (hare) moves twice as fast as the slow pointer (tortoise).",
    answerTwo: "Because it was first introduced in a problem related to animals.",
    answerThree: "Because the technique is as old as the fable of the hare and the tortoise.",
    answerFour: "Because it's a technique best used for animal-related algorithms.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 247,
    category: "Data Structures and Algorithms",
    question: "What is the primary objective of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(nums, target) {
        let left = 0, right = nums.length - 1;
        while (left <= right) {
          let mid = Math.floor((left + right) / 2);
          if (nums[mid] === target) return mid;
          if (nums[mid] < target) left = mid + 1;
          else right = mid - 1;
        }
        return -1;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Performs a binary search for a target value in a sorted array.",
    answerTwo: "Finds the first odd number in the array.",
    answerThree: "Counts the number of occurrences of the target value in the array.",
    answerFour: "Returns the sum of all values in the array.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 248,
    category: "Data Structures and Algorithms",
    question:
      "In which of the following scenarios would the fast and slow pointer technique NOT be suitable?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Detecting cycles in a linked list.",
    answerTwo: "Finding the middle element of a linked list.",
    answerThree: "Balancing a binary search tree.",
    answerFour: "Reversing a linked list in-place.",
    answerFive: "Finding the intersection point of two linked lists.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 249,
    category: "Data Structures and Algorithms",
    question:
      "How can the fast and slow pointer technique be used to find the intersection point of two linked lists?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "By first determining the length difference of the two lists and then traversing the longer list by the difference before moving both pointers together.",
    answerTwo: "By reversing one of the linked lists.",
    answerThree:
      "By traversing one list and storing all its nodes in a hash table, then traversing the other list and checking for nodes in the hash table.",
    answerFour: "By performing a binary search on both linked lists.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 250,
    category: "Data Structures and Algorithms",
    question:
      "Which of the following techniques is primarily used for merging overlapping intervals?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Merge Intervals technique.",
    answerTwo: "Two Pointers technique.",
    answerThree: "Depth-first search.",
    answerFour: "Divide and conquer.",
    answerFive: "Greedy algorithm.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 251,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(intervals) {
        if (!intervals.length) return [];
        intervals.sort((a, b) => a[0] - b[0]);
        const merged = [intervals[0]];
        for (let i = 1; i < intervals.length; i++) {
          if (merged[merged.length - 1][1] >= intervals[i][0]) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], intervals[i][1]);
          } else {
            merged.push(intervals[i]);
          }
        }
        return merged;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Merges overlapping intervals and returns the merged intervals.",
    answerTwo: "Finds the interval with the maximum length.",
    answerThree: "Splits the intervals into two equal halves.",
    answerFour: "Reverses the order of the intervals.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 252,
    category: "Data Structures and Algorithms",
    question:
      "In a list of intervals, what should be the first step before applying the merge intervals technique?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Sorting the intervals based on their start times.",
    answerTwo: "Reversing the order of the intervals.",
    answerThree: "Splitting the intervals into two equal halves.",
    answerFour: "Finding the interval with the maximum length.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 253,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(intervals, newInterval) {
        const merged = [];
        let i = 0;
        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
          merged.push(intervals[i++]);
        }
        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
          newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
          newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
          i++;
        }
        merged.push(newInterval);
        while (i < intervals.length) {
          merged.push(intervals[i++]);
        }
        return merged;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Inserts a new interval and merges overlapping intervals.",
    answerTwo: "Removes the new interval from the list of intervals.",
    answerThree: "Finds the interval with the maximum length.",
    answerFour: "Splits the intervals into two equal halves.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 254,
    category: "Data Structures and Algorithms",
    question: "Why is the merge intervals technique useful in scheduling applications?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "To find and consolidate overlapping time slots.",
    answerTwo: "To split a large time slot into smaller ones.",
    answerThree: "To sort the events based on their duration.",
    answerFour: "To reverse the order of scheduled events.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 255,
    category: "Data Structures and Algorithms",
    question: "When merging intervals, which property indicates that two intervals overlap?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "The start of one interval is less than or equal to the end of the other interval.",
    answerTwo: "The end of one interval is less than the start of the other interval.",
    answerThree: "Both intervals have the same start time.",
    answerFour: "Both intervals have the same end time.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 256,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(intervals) {
        let start = [];
        let end = [];
        for (let i = 0; i < intervals.length; i++) {
          start.push(intervals[i][0]);
          end.push(intervals[i][1]);
        }
        start.sort((a, b) => a - b);
        end.sort((a, b) => a - b);
        let rooms = 0;
        let endItr = 0;
        for (let i = 0; i < start.length; i++) {
          if (start[i] < end[endItr]) {
            rooms++;
          } else {
            endItr++;
          }
        }
        return rooms;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "Calculates the minimum number of rooms required to accommodate all intervals without overlap.",
    answerTwo: "Merges overlapping intervals.",
    answerThree: "Finds the maximum overlapping interval.",
    answerFour: "Calculates the total duration of all intervals.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 257,
    category: "Data Structures and Algorithms",
    question: "Which scenario would NOT benefit from using the merge intervals technique?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Combining overlapping time slots for a conference.",
    answerTwo: "Consolidating overlapping regions in genome sequencing.",
    answerThree: "Determining free slots in a person's daily schedule.",
    answerFour: "Searching for a specific event in a sorted list of events.",
    answerFive: "Merging overlapping network traffic logs.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 258,
    category: "Data Structures and Algorithms",
    question:
      "When determining the minimum number of meeting rooms required given a list of meeting intervals, which auxiliary data structure is often used in conjunction with the merge intervals technique?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Linked List",
    answerTwo: "Stack",
    answerThree: "Priority Queue",
    answerFour: "Graph",
    answerFive: "Hash Table",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 259,
    category: "Data Structures and Algorithms",
    question: "What's the primary challenge addressed by the merge intervals technique?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Handling overlapping intervals in a set of intervals.",
    answerTwo: "Sorting a set of intervals based on their start times.",
    answerThree: "Splitting a large interval into multiple smaller intervals.",
    answerFour: "Combining two sets of intervals into one.",
    answerFive: "None of the above",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 260,
    category: "Data Structures and Algorithms",
    question:
      "Which sorting algorithm is especially effective for sorting numbers in a given range, like 1 to n?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Cyclic Sort",
    answerTwo: "Quick Sort",
    answerThree: "Bubble Sort",
    answerFour: "Merge Sort",
    answerFive: "Insertion Sort",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 261,
    category: "Data Structures and Algorithms",
    question:
      "What is the primary characteristic of the input array that makes Cyclic Sort an efficient sorting method?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "The array is already partially sorted.",
    answerTwo: "The array contains many duplicate elements.",
    answerThree: "The array contains numbers from 1 to n.",
    answerFour: "The array has a large number of elements.",
    answerFive: "The array has elements in descending order.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 262,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(nums) {
        let i = 0;
        while (i < nums.length) {
          if (nums[i] !== i + 1) {
            let temp = nums[i];
            nums[i] = nums[temp - 1];
            nums[temp - 1] = temp;
          } else {
            i++;
          }
        }
        return nums;
      }
      `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Sorts an array of numbers from 1 to n using the Cyclic Sort method.",
    answerTwo: "Reverses the order of the elements in the array.",
    answerThree: "Finds the maximum number in the array.",
    answerFour: "Removes duplicate elements from the array.",
    answerFive: "Randomly shuffles the elements in the array.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 263,
    category: "Data Structures and Algorithms",
    question: "Why is Cyclic Sort considered an in-place sorting algorithm?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It sorts the input array without using any additional space.",
    answerTwo: "It requires a copy of the input array to perform the sort.",
    answerThree: "It uses recursion and a stack to sort the array.",
    answerFour: "It sorts the array by repeatedly reversing sections of the input.",
    answerFive: "It divides the array into multiple sub-arrays before sorting.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 264,
    category: "Data Structures and Algorithms",
    question: "In Cyclic Sort, when do we swap two numbers in the array?",
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "When the numbers are in ascending order.",
    answerTwo: "When a number is not at its correct position.",
    answerThree: "When two numbers are adjacent.",
    answerFour: "When the numbers are in descending order.",
    answerFive: "When the number is negative.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 265,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(nums) {
        let i = 0;
        while (i < nums.length) {
          if (nums[i] !== nums[nums[i] - 1]) {
            let temp = nums[i];
            nums[i] = nums[temp - 1];
            nums[temp - 1] = temp;
          } else {
            i++;
          }
        }
        for (i = 0; i < nums.length; i++) {
          if (nums[i] !== i + 1) {
            return i + 1;
          }
        }
      }
      `,
    correctAnswerArray: [false, true, false, false, false],
    answerOne: "Calculates the sum of all the numbers in the array.",
    answerTwo: "Finds the first missing positive number in the array.",
    answerThree: "Determines the maximum number in the array.",
    answerFour: "Removes all duplicate numbers from the array.",
    answerFive: "Counts the number of negative numbers in the array.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 266,
    category: "Data Structures and Algorithms",
    question: "Which of the following is NOT a typical application of Cyclic Sort?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Finding the first missing positive number.",
    answerTwo: "Detecting a cycle in a linked list.",
    answerThree: "Sorting a list of strings alphabetically.",
    answerFour: "Finding duplicate numbers in an array.",
    answerFive: "Arranging numbers from 1 to n in an array.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 267,
    category: "Data Structures and Algorithms",
    question: "How can Cyclic Sort help in identifying duplicate numbers in an array?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "By counting the frequency of each number.",
    answerTwo: "By sorting the array in descending order.",
    answerThree: "By placing each number at its correct position and checking for discrepancies.",
    answerFour: "By comparing each number with its adjacent numbers.",
    answerFive: "By summing up all the numbers and checking the total.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 268,
    category: "Data Structures and Algorithms",
    question: "In terms of time complexity, how efficient is the Cyclic Sort algorithm?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "O(1)",
    answerTwo: "O(log n)",
    answerThree: "O(n)",
    answerFour: "O(n log n)",
    answerFive: "O(n^2)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 269,
    category: "Data Structures and Algorithms",
    question:
      "What advantage does Cyclic Sort offer over other sorting algorithms when dealing with numbers in a given range?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It sorts the numbers without using any additional space and in linear time.",
    answerTwo: "It sorts the numbers in logarithmic time.",
    answerThree: "It can handle arrays with millions of elements efficiently.",
    answerFour: "It is more versatile and can sort any type of data.",
    answerFive: "It can sort both numbers and strings simultaneously.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 270,
    category: "Data Structures and Algorithms",
    question: "Which method is used to reverse a singly linked list without using any extra space?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "In-place reversal",
    answerTwo: "Merge sort",
    answerThree: "Recursion with extra memory",
    answerFour: "Using a stack",
    answerFive: "Using two linked lists",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 271,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
        function randomFunctionName(head) {
          let prev = null;
          while (head !== null) {
            let next = head.next;
            head.next = prev;
            prev = head;
            head = next;
          }
          return prev;
        }
        `,
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Detects a cycle in the linked list.",
    answerTwo: "Finds the middle of the linked list.",
    answerThree: "Counts the number of nodes in the linked list.",
    answerFour: "Reverses the linked list in-place.",
    answerFive: "Sorts the linked list in ascending order.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 272,
    category: "Data Structures and Algorithms",
    question: "How can you reverse a specific sub-part of a linked list?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Using recursive mergesort.",
    answerTwo: "By counting nodes and using a stack.",
    answerThree:
      "By using pointers to identify the start and end of the sub-part and then applying in-place reversal.",
    answerFour: "By copying the sub-part to a new list and reversing it separately.",
    answerFive: "By swapping node values without changing node links.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 273,
    category: "Data Structures and Algorithms",
    question: "Why is the in-place reversal of a linked list considered space efficient?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "It doesn't use any extra space proportional to the number of nodes in the list.",
    answerTwo: "Because it reduces the size of the linked list.",
    answerThree: "It uses a constant amount of space regardless of the linked list's size.",
    answerFour: "Because it uses recursion.",
    answerFive: "Because it sorts the linked list.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 274,
    category: "Data Structures and Algorithms",
    question: "What is the time complexity of the in-place reversal of a linked list?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "O(1)",
    answerTwo: "O(log n)",
    answerThree: "O(n^2)",
    answerFour: "O(n)",
    answerFive: "O(n log n)",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 275,
    category: "Data Structures and Algorithms",
    question:
      "Which data structure is crucial for the implementation of in-place reversal methods?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Array",
    answerTwo: "Stack",
    answerThree: "Queue",
    answerFour: "Linked List",
    answerFive: "Binary Tree",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 276,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
        function randomFunctionName(head, m, n) {
          if (!head || m === n) return head;
    
          let dummy = new ListNode(0);
          dummy.next = head;
          let prev = dummy;
    
          for (let i = 0; i < m - 1; i++) {
            prev = prev.next;
          }
    
          let current = prev.next;
          let next = null;
    
          for (let i = 0; i < n - m + 1; i++) {
            next = current.next;
            current.next = next.next;
            next.next = prev.next;
            prev.next = next;
          }
    
          return dummy.next;
        }
        `,
    correctAnswerArray: [true, false, false, false, false],
    answerOne: "Reverses a sub-part of a linked list between positions m and n.",
    answerTwo: "Finds the mth node from the end of the linked list.",
    answerThree: "Deletes all nodes whose value is between m and n.",
    answerFour: "Merges two sorted linked lists.",
    answerFive: "Detects a cycle in the linked list.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 277,
    category: "Data Structures and Algorithms",
    question:
      "After in-place reversal, what happens to the first node of the original linked list?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "It becomes the middle node of the linked list.",
    answerTwo: "It remains the first node.",
    answerThree: "It becomes the last node of the linked list.",
    answerFour: "It gets deleted.",
    answerFive: "It becomes the second node of the linked list.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 278,
    category: "Data Structures and Algorithms",
    question: "For in-place reversal, which of the following is NOT required?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "A previous node pointer",
    answerTwo: "A current node pointer",
    answerThree: "A next node pointer",
    answerFour: "A helper array",
    answerFive: "A dummy node for certain cases",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 279,
    category: "Data Structures and Algorithms",
    question: "In the context of linked list reversal, what is the role of the 'next' pointer?",
    correctAnswerArray: [true, false, false, false, false],
    answerOne:
      "It temporarily stores the next node so we don't lose the reference while reversing the current node's direction.",
    answerTwo: "It points to the previous node.",
    answerThree: "It is used to create a new linked list.",
    answerFour: "It helps in finding the middle of the linked list.",
    answerFive: "It detects cycles in the linked list.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },

  {
    questionNumber: 280,
    category: "Data Structures and Algorithms",
    question: "In which traversal method do we process a node's children before its siblings?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Tree DFS",
    answerTwo: "In-order traversal",
    answerThree: "Post-order traversal",
    answerFour: "Tree BFS",
    answerFive: "Pre-order traversal",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 281,
    category: "Data Structures and Algorithms",
    question: "What is the purpose of the following code snippet?",
    codeSnippet: `
      function randomFunctionName(root) {
        if (!root) return [];
        let result = [];
        let queue = [root];
        while (queue.length) {
          let currentNode = queue.shift();
          result.push(currentNode.val);
          if (currentNode.left) queue.push(currentNode.left);
          if (currentNode.right) queue.push(currentNode.right);
        }
        return result;
      }
      `,
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Returns the sum of all nodes in a binary tree.",
    answerTwo: "Counts the number of leaf nodes in the tree.",
    answerThree:
      "Performs BFS traversal on a binary tree and returns node values in the order of traversal.",
    answerFour: "Evaluates the average of all tree nodes.",
    answerFive: "Performs DFS traversal on the binary tree.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 282,
    category: "Data Structures and Algorithms",
    question:
      "Why is BFS traversal preferred over DFS when finding the shortest path in unweighted trees?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "Because BFS uses recursion.",
    answerTwo: "Because BFS is more memory efficient.",
    answerThree:
      "Because BFS explores nodes level by level, ensuring the shortest path is found first.",
    answerFour: "Because BFS can handle cycles better.",
    answerFive: "Because BFS is more time efficient.",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 283,
    category: "Data Structures and Algorithms",
    question:
      "In BFS traversal, which data structure is primarily utilized to keep track of nodes to be explored?",
    correctAnswerArray: [false, false, false, true, false],
    answerOne: "Array",
    answerTwo: "Stack",
    answerThree: "Hashtable",
    answerFour: "Queue",
    answerFive: "Tree",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
  {
    questionNumber: 284,
    category: "Data Structures and Algorithms",
    question: "In a BFS traversal of a tree, which node is processed first?",
    correctAnswerArray: [false, false, true, false, false],
    answerOne: "The deepest node",
    answerTwo: "The rightmost node",
    answerThree: "The root node",
    answerFour: "A random node",
    answerFive: "The leftmost leaf node",
    timesCorrect: 0,
    timesIncorrect: 0,
  },
];

module.exports = questionData;
