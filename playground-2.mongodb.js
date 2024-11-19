// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('aggregationPipelineLearn');

// Create a new document in the collection.
db.getCollection("user").insertMany(

  [
    {
      "index": 1,
      "name": "John Doe",
      "isActive": true,
      "registered_date": "2022-06-15T08:30:00Z",
      "gender": "male",
      "age": 30,
      "eyecolor": "blue",
      "favourite_fruit": "apple",
      "company": {
        "title": "Software Engineer",
        "email": "john.doe@example.com",
        "phone": "+1 234 567 890",
        "location": {
          "country": "USA",
          "address": "1234 Elm St, Springfield, IL"
        }
      },
      "tags": ["enim", "id", "velit", "ad", "consequet"]
    },
    {
      "index": 2,
      "name": "Jane Smith",
      "isActive": false,
      "registered_date": "2020-11-20T12:45:00Z",
      "gender": "female",
      "age": 28,
      "eyecolor": "green",
      "favourite_fruit": "banana",
      "company": {
        "title": "Product Manager",
        "email": "jane.smith@example.com",
        "phone": "+1 987 654 321",
        "location": {
          "country": "Canada",
          "address": "5678 Oak Ave, Toronto, ON"
        }
      },
      "tags": ["consectetur", "quis", "commodo", "nobis"]
    },
    {
      "index": 3,
      "name": "Alice Johnson",
      "isActive": true,
      "registered_date": "2023-01-30T09:00:00Z",
      "gender": "female",
      "age": 25,
      "eyecolor": "brown",
      "favourite_fruit": "cherry",
      "company": {
        "title": "UX Designer",
        "email": "alice.johnson@example.com",
        "phone": "+44 20 7946 0958",
        "location": {
          "country": "UK",
          "address": "89 Victoria Rd, London"
        }
      },
      "tags": ["laborum", "dolor", "exercitation", "enim"]
    },
    {
      "index": 4,
      "name": "Bob Lee",
      "isActive": true,
      "registered_date": "2021-09-05T14:15:00Z",
      "gender": "male",
      "age": 35,
      "eyecolor": "hazel",
      "favourite_fruit": "orange",
      "company": {
        "title": "Data Scientist",
        "email": "bob.lee@example.com",
        "phone": "+33 1 70 18 34 56",
        "location": {
          "country": "France",
          "address": "45 Rue de Rivoli, Paris"
        }
      },
      "tags": ["tempor", "cillum", "sunt", "voluptate"]
    },
    {
      "index": 5,
      "name": "Sarah Williams",
      "isActive": true,
      "registered_date": "2023-03-12T16:00:00Z",
      "gender": "female",
      "age": 29,
      "eyecolor": "black",
      "favourite_fruit": "grape",
      "company": {
        "title": "Marketing Specialist",
        "email": "sarah.williams@example.com",
        "phone": "+1 555 112 233",
        "location": {
          "country": "USA",
          "address": "4321 Maple Dr, Austin, TX"
        }
      },
      "tags": ["voluptate", "tempor", "incididunt", "adipisicing"]
    },
    {
      "index": 6,
      "name": "David Kim",
      "isActive": false,
      "registered_date": "2020-05-08T17:45:00Z",
      "gender": "male",
      "age": 32,
      "eyecolor": "brown",
      "favourite_fruit": "kiwi",
      "company": {
        "title": "Graphic Designer",
        "email": "david.kim@example.com",
        "phone": "+1 123 456 7890",
        "location": {
          "country": "South Korea",
          "address": "1010 Digital St, Seoul"
        }
      },
      "tags": ["quis", "consectetur", "mollit", "do"]
    },
    {
      "index": 7,
      "name": "Emily Davis",
      "isActive": true,
      "registered_date": "2022-08-24T11:30:00Z",
      "gender": "female",
      "age": 27,
      "eyecolor": "gray",
      "favourite_fruit": "pear",
      "company": {
        "title": "HR Manager",
        "email": "emily.davis@example.com",
        "phone": "+44 20 7946 1122",
        "location": {
          "country": "Ireland",
          "address": "15 St. Patrick’s Rd, Dublin"
        }
      },
      "tags": ["reprehenderit", "aliquip", "eu", "laboris"]
    },
    {
      "index": 8,
      "name": "Christopher Moore",
      "isActive": true,
      "registered_date": "2021-02-19T10:00:00Z",
      "gender": "male",
      "age": 33,
      "eyecolor": "blue",
      "favourite_fruit": "watermelon",
      "company": {
        "title": "Software Developer",
        "email": "christopher.moore@example.com",
        "phone": "+1 555 223 344",
        "location": {
          "country": "USA",
          "address": "555 Pine St, New York, NY"
        }
      },
      "tags": ["velit", "officia", "mollit", "est"]
    },
    {
      "index": 9,
      "name": "Olivia Brown",
      "isActive": false,
      "registered_date": "2019-04-21T07:15:00Z",
      "gender": "female",
      "age": 40,
      "eyecolor": "green",
      "favourite_fruit": "mango",
      "company": {
        "title": "Chief Operating Officer",
        "email": "olivia.brown@example.com",
        "phone": "+1 876 543 210",
        "location": {
          "country": "Canada",
          "address": "12 King’s Rd, Toronto, ON"
        }
      },
      "tags": ["ut", "incididunt", "dolore", "voluptate"]
    },
    {
      "index": 10,
      "name": "Michael Carter",
      "isActive": true,
      "registered_date": "2023-06-02T08:20:00Z",
      "gender": "male",
      "age": 26,
      "eyecolor": "black",
      "favourite_fruit": "pineapple",
      "company": {
        "title": "Project Manager",
        "email": "michael.carter@example.com",
        "phone": "+1 234 567 8901",
        "location": {
          "country": "USA",
          "address": "789 Maple Rd, Chicago, IL"
        }
      },
      "tags": ["consequat", "eu", "commodo", "mollit"]
    },
    {
      "index": 11,
      "name": "Sophia Taylor",
      "isActive": true,
      "registered_date": "2022-02-17T15:25:00Z",
      "gender": "female",
      "age": 23,
      "eyecolor": "blue",
      "favourite_fruit": "strawberry",
      "company": {
        "title": "Business Analyst",
        "email": "sophia.taylor@example.com",
        "phone": "+44 20 7946 0025",
        "location": {
          "country": "UK",
          "address": "25 Green Park, London"
        }
      },
      "tags": ["fugiat", "enim", "cupidatat", "officia"]
    },
    {
      "index": 12,
      "name": "Daniel Harris",
      "isActive": true,
      "registered_date": "2021-12-12T13:10:00Z",
      "gender": "male",
      "age": 38,
      "eyecolor": "brown",
      "favourite_fruit": "pear",
      "company": {
        "title": "System Administrator",
        "email": "daniel.harris@example.com",
        "phone": "+33 1 234 567 890",
        "location": {
          "country": "France",
          "address": "19 Rue du Louvre, Paris"
        }
      },
      "tags": ["laborum", "qui", "consequat", "id"]
    },
    {
      "index": 13,
      "name": "Jack Wilson",
      "isActive": true,
      "registered_date": "2023-05-09T10:30:00Z",
      "gender": "male",
      "age": 28,
      "eyecolor": "green",
      "favourite_fruit": "peach",
      "company": {
        "title": "Product Designer",
        "email": "jack.wilson@example.com",
        "phone": "+1 415 678 9012",
        "location": {
          "country": "USA",
          "address": "34 Sunset Blvd, San Francisco, CA"
        }
      },
      "tags": ["non", "do", "ut", "ex"]
    },
    {
      "index": 14,
      "name": "Grace Moore",
      "isActive": false,
      "registered_date": "2020-09-18T11:55:00Z",
      "gender": "female",
      "age": 45,
      "eyecolor": "blue",
      "favourite_fruit": "blackberry",
      "company": {
        "title": "Content Writer",
        "email": "grace.moore@example.com",
        "phone": "+44 20 7936 2025",
        "location": {
          "country": "UK",
          "address": "77 High St, Edinburgh"
        }
      },
      "tags": ["est", "adipisicing", "nulla", "laboris"]
    },
    {
      "index": 15,
      "name": "Hannah Lee",
      "isActive": true,
      "registered_date": "2021-11-21T18:00:00Z",
      "gender": "female",
      "age": 33,
      "eyecolor": "hazel",
      "favourite_fruit": "lemon",
      "company": {
        "title": "SEO Specialist",
        "email": "hannah.lee@example.com",
        "phone": "+1 321 654 9870",
        "location": {
          "country": "USA",
          "address": "89 Citrus Rd, Los Angeles, CA"
        }
      },
      "tags": ["sit", "excepteur", "culpa", "esse"]
    },
    {
      "index": 16,
      "name": "Samuel Allen",
      "isActive": true,
      "registered_date": "2022-01-25T10:45:00Z",
      "gender": "male",
      "age": 29,
      "eyecolor": "brown",
      "favourite_fruit": "apricot",
      "company": {
        "title": "Chief Technology Officer",
        "email": "samuel.allen@example.com",
        "phone": "+1 303 456 7891",
        "location": {
          "country": "USA",
          "address": "12 Sunset Ave, Denver, CO"
        }
      },
      "tags": ["ut", "reprehenderit", "enim", "nisi"]
    },
    {
      "index": 17,
      "name": "Charlotte Martinez",
      "isActive": true,
      "registered_date": "2023-04-11T16:30:00Z",
      "gender": "female",
      "age": 34,
      "eyecolor": "green",
      "favourite_fruit": "fig",
      "company": {
        "title": "Legal Advisor",
        "email": "charlotte.martinez@example.com",
        "phone": "+44 20 7946 9988",
        "location": {
          "country": "UK",
          "address": "34 Baker St, London"
        }
      },
      "tags": ["fugiat", "reprehenderit", "consectetur", "velit"]
    },
    {
      "index": 18,
      "name": "William Scott",
      "isActive": false,
      "registered_date": "2020-03-14T12:40:00Z",
      "gender": "male",
      "age": 42,
      "eyecolor": "hazel",
      "favourite_fruit": "blueberry",
      "company": {
        "title": "Business Consultant",
        "email": "william.scott@example.com",
        "phone": "+1 541 112 2334",
        "location": {
          "country": "USA",
          "address": "211 Birch Rd, Seattle, WA"
        }
      },
      "tags": ["cillum", "eu", "enim", "sit"]
    },
    {
      "index": 19,
      "name": "Zoe Harris",
      "isActive": true,
      "registered_date": "2023-07-07T17:25:00Z",
      "gender": "female",
      "age": 31,
      "eyecolor": "blue",
      "favourite_fruit": "pineapple",
      "company": {
        "title": "Financial Analyst",
        "email": "zoe.harris@example.com",
        "phone": "+44 20 7946 3333",
        "location": {
          "country": "UK",
          "address": "55 River St, Manchester"
        }
      },
      "tags": ["voluptate", "non", "officia", "dolor"]
    },
    {
      "index": 20,
      "name": "Lucas Perez",
      "isActive": true,
      "registered_date": "2022-10-09T08:15:00Z",
      "gender": "male",
      "age": 28,
      "eyecolor": "green",
      "favourite_fruit": "papaya",
      "company": {
        "title": "Security Analyst",
        "email": "lucas.perez@example.com",
        "phone": "+34 91 234 5678",
        "location": {
          "country": "Spain",
          "address": "1234 Plaza Mayor, Madrid"
        }
      },
      "tags": ["elit", "ut", "reprehenderit", "labore"]
    }
  ]
  
);
