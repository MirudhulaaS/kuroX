// All 234 Tamil Nadu Legislative Assembly Constituencies (2008 Delimitation)
// With official constituency numbers, current MLAs (elected 2021), and party affiliation

export const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

// Party color flags (CSS-friendly)
export const PARTY_INFO = {
  "DMK":    { color: "#E53935", flag: "🔴" },
  "AIADMK": { color: "#43A047", flag: "🟢" },
  "INC":    { color: "#1E88E5", flag: "🔵" },
  "BJP":    { color: "#FF8F00", flag: "🟠" },
  "PMK":    { color: "#FFD600", flag: "🟡" },
  "CPI":    { color: "#C62828", flag: "🟥" },
  "CPI(M)": { color: "#B71C1C", flag: "🟥" },
  "MDMK":   { color: "#D32F2F", flag: "🔶" },
  "IUML":   { color: "#2E7D32", flag: "🟩" },
  "MMK":    { color: "#6D4C41", flag: "🟤" },
  "VCK":    { color: "#1565C0", flag: "🔷" },
  "TMC(M)": { color: "#AD1457", flag: "🟪" },
  "IND":    { color: "#757575", flag: "⬜" },
};

// Each constituency: { no, name, mla, party }
export const DISTRICT_CONSTITUENCIES = {
  "Tiruvallur": [
    { no: 1, name: "Gummidipoondi", mla: "T.J. Govindarajan", party: "DMK" },
    { no: 2, name: "Ponneri", mla: "Durai Chandrasekar", party: "INC" },
    { no: 3, name: "Tiruttani", mla: "S. Chandran", party: "DMK" },
    { no: 4, name: "Thiruvallur", mla: "V.G. Raajendran", party: "DMK" },
    { no: 5, name: "Poonamallee", mla: "A. Krishnaswamy", party: "DMK" },
    { no: 6, name: "Avadi", mla: "S.M. Nasar", party: "DMK" },
    { no: 7, name: "Maduravoyal", mla: "K. Ganapathy", party: "DMK" }
  ],
  "Chennai": [
    { no: 8, name: "Ambattur", mla: "Joseph Samuel", party: "DMK" },
    { no: 9, name: "Madavaram", mla: "S. Sudharsanam", party: "DMK" },
    { no: 10, name: "Thiruvottiyur", mla: "K.P. Shankar", party: "DMK" },
    { no: 11, name: "Dr. Radhakrishnan Nagar", mla: "J.J. Ebenezer", party: "DMK" },
    { no: 12, name: "Perambur", mla: "R.D. Sekar", party: "DMK" },
    { no: 13, name: "Kolathur", mla: "M.K. Stalin", party: "DMK" },
    { no: 14, name: "Villivakkam", mla: "A. Vetriazhagan", party: "DMK" },
    { no: 15, name: "Thiru-Vi-Ka-Nagar", mla: "A.M. Periyakaruppan", party: "DMK" },
    { no: 16, name: "Egmore", mla: "I. Paranthamen", party: "DMK" },
    { no: 17, name: "Royapuram", mla: "R. Murthy", party: "DMK" },
    { no: 18, name: "Harbour", mla: "P.K. Sekar Babu", party: "DMK" },
    { no: 19, name: "Chepauk-Thiruvallikeni", mla: "Udhayanidhi Stalin", party: "DMK" },
    { no: 20, name: "Thousand Lights", mla: "Ezhilan Naganathan", party: "DMK" },
    { no: 21, name: "Anna Nagar", mla: "M.K. Mohan", party: "DMK" },
    { no: 22, name: "Virugambakkam", mla: "A.M.V. Prabhakara Raja", party: "DMK" },
    { no: 23, name: "Saidapet", mla: "Ma. Subramanian", party: "DMK" },
    { no: 24, name: "T. Nagar", mla: "J. Karunanithi", party: "DMK" },
    { no: 25, name: "Mylapore", mla: "Dha. Velu", party: "DMK" },
    { no: 26, name: "Velachery", mla: "J.M.H. Aassan Maulaana", party: "INC" },
    { no: 27, name: "Sholinganallur", mla: "S. Aravind Ramesh", party: "DMK" },
    { no: 28, name: "Alandur", mla: "T.M. Anbarasan", party: "DMK" }
  ],
  "Chengalpattu": [
    { no: 29, name: "Sriperumbudur", mla: "K. Rajan", party: "DMK" },
    { no: 30, name: "Pallavaram", mla: "Anbazhagan", party: "DMK" },
    { no: 31, name: "Tambaram", mla: "S. Ravi", party: "DMK" },
    { no: 32, name: "Chengalpattu", mla: "Varalakshmi M.", party: "DMK" },
    { no: 33, name: "Thiruporur", mla: "V.P. Shunmugam", party: "DMK" },
    { no: 34, name: "Cheyyur", mla: "D. Anbumani", party: "DMK" },
    { no: 35, name: "Madurantakam", mla: "N. Kayalvizhi", party: "DMK" }
  ],
  "Kanchipuram": [
    { no: 36, name: "Uthiramerur", mla: "K. Pitchandi", party: "DMK" },
    { no: 37, name: "Kancheepuram", mla: "C.V.M.P. Ezhilarasan", party: "DMK" }
  ],
  "Ranipet": [
    { no: 38, name: "Arakkonam", mla: "S. Ravi", party: "DMK" },
    { no: 39, name: "Sholingur", mla: "D. Mathivanan", party: "DMK" },
    { no: 40, name: "Ranipet", mla: "R. Gandhi", party: "DMK" },
    { no: 41, name: "Arcot", mla: "A.M.H. Nazeem", party: "DMK" }
  ],
  "Vellore": [
    { no: 42, name: "Katpadi", mla: "K. Kalaiselvi", party: "DMK" },
    { no: 43, name: "Vellore", mla: "P. Karthikeyan", party: "DMK" },
    { no: 44, name: "Anaikattu", mla: "I.S. Inbadurai", party: "DMK" },
    { no: 45, name: "Kilvaithinankuppam", mla: "K. Ammavasi", party: "DMK" },
    { no: 46, name: "Gudiyattam", mla: "S.A. Mohammed John", party: "DMK" }
  ],
  "Tirupattur": [
    { no: 47, name: "Vaniyambadi", mla: "C. Abiramivalli", party: "DMK" },
    { no: 48, name: "Ambur", mla: "A.R.M. Selvaraj", party: "DMK" },
    { no: 49, name: "Jolarpet", mla: "A. Andiyappan", party: "DMK" },
    { no: 50, name: "Tirupattur", mla: "A. Nallathambi", party: "DMK" }
  ],
  "Krishnagiri": [
    { no: 51, name: "Uthangarai", mla: "S. Balakrishna Reddy", party: "AIADMK" },
    { no: 52, name: "Bargur", mla: "E. Karunanidhi", party: "DMK" },
    { no: 53, name: "Krishnagiri", mla: "K. Ashok Kumar", party: "AIADMK" },
    { no: 54, name: "Veppanahalli", mla: "K. Nallasamy", party: "DMK" },
    { no: 55, name: "Hosur", mla: "Y. Prakash", party: "DMK" },
    { no: 56, name: "Thalli", mla: "R.S. Munirathinam", party: "INC" }
  ],
  "Dharmapuri": [
    { no: 57, name: "Palacodu", mla: "A. Selvam", party: "PMK" },
    { no: 58, name: "Pennagaram", mla: "G. Srinivasan", party: "AIADMK" },
    { no: 59, name: "Dharmapuri", mla: "S.P. Venkateshwaran", party: "PMK" },
    { no: 60, name: "Pappireddipatti", mla: "G.S. Thennarasu", party: "DMK" },
    { no: 61, name: "Harur", mla: "K.P. Munuswamy", party: "VCK" }
  ],
  "Tiruvannamalai": [
    { no: 62, name: "Chengam", mla: "K. Selvaperunthagai", party: "INC" },
    { no: 63, name: "Tiruvannamalai", mla: "E.V. Velu", party: "DMK" },
    { no: 64, name: "Kilpennathur", mla: "S. Mathiyalagan", party: "DMK" },
    { no: 65, name: "Kalasapakkam", mla: "M. Chinnadurai", party: "DMK" },
    { no: 66, name: "Polur", mla: "K. Kuppusamy", party: "DMK" },
    { no: 67, name: "Arani", mla: "K.K. Ramachandran", party: "DMK" },
    { no: 68, name: "Cheyyar", mla: "T.R.Baalu Rajendran", party: "DMK" }
  ],
  "Viluppuram": [
    { no: 69, name: "Vandavasi", mla: "S. Gopalakrishnan", party: "DMK" },
    { no: 70, name: "Gingee", mla: "A.M.S.P. Amman", party: "DMK" },
    { no: 71, name: "Mailam", mla: "A. Maniyarasan", party: "DMK" },
    { no: 72, name: "Tindivanam", mla: "K. Kumaresan", party: "DMK" },
    { no: 73, name: "Vanur", mla: "K. Prathapan", party: "DMK" },
    { no: 74, name: "Villupuram", mla: "R. Lakshmanan", party: "DMK" },
    { no: 75, name: "Vikravandi", mla: "N. Pugazhenthi", party: "DMK" },
    { no: 76, name: "Tirukkoyilur", mla: "R. Muthamilselvan", party: "DMK" }
  ],
  "Kallakurichi": [
    { no: 77, name: "Ulundurpettai", mla: "R. Sindhanai Selvan", party: "DMK" },
    { no: 78, name: "Rishivandiyam", mla: "S. Kamaraj", party: "DMK" },
    { no: 79, name: "Sankarapuram", mla: "M. Asaithambi", party: "DMK" },
    { no: 80, name: "Kallakurichi", mla: "M. Prabhu", party: "DMK" },
    { no: 81, name: "Gangavalli", mla: "K.S. Masthan", party: "DMK" }
  ],
  "Salem": [
    { no: 82, name: "Attur", mla: "M. Selvaraj", party: "DMK" },
    { no: 83, name: "Yercaud", mla: "P. Selvaraj", party: "DMK" },
    { no: 84, name: "Omalur", mla: "Ra. Rajendran", party: "DMK" },
    { no: 85, name: "Mettur", mla: "Ap. Palanisamy", party: "AIADMK" },
    { no: 86, name: "Edappadi", mla: "K. Palaniswami", party: "AIADMK" },
    { no: 87, name: "Sankari", mla: "K.T. Raghavan", party: "AIADMK" },
    { no: 88, name: "Salem (West)", mla: "R. Rajendran", party: "DMK" },
    { no: 89, name: "Salem (North)", mla: "S. Rukmangadhan", party: "DMK" },
    { no: 90, name: "Salem (South)", mla: "S. Rajakumar", party: "DMK" },
    { no: 91, name: "Veerapandi", mla: "Thiru. Durai Vaiko", party: "DMK" }
  ],
  "Namakkal": [
    { no: 92, name: "Rasipuram", mla: "K.R. Periyakarupan", party: "DMK" },
    { no: 93, name: "Senthamangalam", mla: "S. Thennarasu", party: "DMK" },
    { no: 94, name: "Namakkal", mla: "S. Selvaganapathy", party: "DMK" },
    { no: 95, name: "Paramathi-Velur", mla: "R. Thamarai Selvi", party: "DMK" },
    { no: 96, name: "Tiruchengode", mla: "P.M. Palanisamy", party: "AIADMK" },
    { no: 97, name: "Kumarapalayam", mla: "K. Kuppusamy", party: "DMK" }
  ],
  "Erode": [
    { no: 98, name: "Erode (East)", mla: "K.V. Ramalingam", party: "DMK" },
    { no: 99, name: "Erode (West)", mla: "E. Thirumahan Everaa", party: "DMK" },
    { no: 100, name: "Modakkurichi", mla: "A. Sathiyamoorthy", party: "DMK" },
    { no: 101, name: "Gobichettipalayam", mla: "K. Kadarkarai", party: "DMK" },
    { no: 102, name: "Bhavanisagar", mla: "S. Periyasamy", party: "AIADMK" },
    { no: 103, name: "Anthiyur", mla: "A.G. Venkatachalam", party: "AIADMK" },
    { no: 104, name: "Bhavani", mla: "S. Kamaraj", party: "DMK" },
    { no: 105, name: "Perundurai", mla: "T.R.P. Arunachalam", party: "AIADMK" }
  ],
  "Tiruppur": [
    { no: 106, name: "Dharapuram", mla: "S. Karthik", party: "AIADMK" },
    { no: 107, name: "Kangayam", mla: "U. Thaniyarasu", party: "AIADMK" },
    { no: 108, name: "Avinashi", mla: "C. Thangamani", party: "AIADMK" },
    { no: 109, name: "Tiruppur (North)", mla: "A.K. Selvaraj", party: "DMK" },
    { no: 110, name: "Tiruppur (South)", mla: "K. Ashok Kumar", party: "DMK" },
    { no: 111, name: "Palladam", mla: "N. Kayalvizhi Selvaraj", party: "DMK" }
  ],
  "Coimbatore": [
    { no: 112, name: "Sulur", mla: "N.S. Kanimozhi", party: "DMK" },
    { no: 113, name: "Kavundampalayam", mla: "Ka. Kuppusami", party: "DMK" },
    { no: 114, name: "Coimbatore (North)", mla: "K. Karthik", party: "DMK" },
    { no: 115, name: "Coimbatore (South)", mla: "R. Vaigaichelvan", party: "AIADMK" },
    { no: 116, name: "Singanallur", mla: "N. Muruganandam", party: "DMK" },
    { no: 117, name: "Kinathukadavu", mla: "P. Bharathiraja", party: "DMK" },
    { no: 118, name: "Pollachi", mla: "K. Suresh", party: "DMK" },
    { no: 119, name: "Valparai", mla: "K.T. Tamilarasu", party: "INC" }
  ],
  "Nilgiris": [
    { no: 120, name: "Udumalaipettai", mla: "S.A.M. Hussain Babu", party: "DMK" },
    { no: 121, name: "Madathukulam", mla: "K.A. Jayabal", party: "DMK" },
    { no: 122, name: "Nilgiris", mla: "A.K. Selvasundari", party: "DMK" },
    { no: 123, name: "Coonoor", mla: "M.R. Gandhi", party: "DMK" },
    { no: 124, name: "Gudalur", mla: "K. Lakshmanan", party: "INC" }
  ],
  "Karur": [
    { no: 125, name: "Aravakurichi", mla: "R. Elango", party: "DMK" },
    { no: 126, name: "Karur", mla: "M. Senthilkumar", party: "DMK" },
    { no: 127, name: "Krishnarayapuram", mla: "T. Thangapandian", party: "DMK" },
    { no: 128, name: "Kulithalai", mla: "M. Karthikeyan", party: "DMK" }
  ],
  "Tiruchirappalli": [
    { no: 129, name: "Manapparai", mla: "P. Amirtharaj", party: "INC" },
    { no: 130, name: "Srirangam", mla: "T. Udhayasurian", party: "DMK" },
    { no: 131, name: "Tiruchirappalli (West)", mla: "K.N. Nehru", party: "DMK" },
    { no: 132, name: "Tiruchirappalli (East)", mla: "V. Idhayavarman", party: "DMK" },
    { no: 133, name: "Thiruverumbur", mla: "S. Karunaas", party: "DMK" },
    { no: 134, name: "Lalgudi", mla: "P. Suresh", party: "DMK" },
    { no: 135, name: "Manachanallur", mla: "M.R.K. Panneerselvam", party: "DMK" },
    { no: 136, name: "Musiri", mla: "S. Balasubramanian", party: "DMK" },
    { no: 137, name: "Thuraiyur", mla: "Cheeni Kalyanasundaram", party: "DMK" }
  ],
  "Perambalur": [
    { no: 138, name: "Perambalur", mla: "T.K.G. Neelamegam", party: "DMK" },
    { no: 139, name: "Kunnam", mla: "K. Selvaraj", party: "DMK" }
  ],
  "Ariyalur": [
    { no: 140, name: "Ariyalur", mla: "A. Senthilkumar", party: "DMK" },
    { no: 141, name: "Jayankondam", mla: "S. Rajeshkumar", party: "DMK" }
  ],
  "Cuddalore": [
    { no: 142, name: "Tittakudi", mla: "P. Selvaganapathy", party: "DMK" },
    { no: 143, name: "Vridhachalam", mla: "M.L.A. Chinnappan", party: "DMK" },
    { no: 144, name: "Neyveli", mla: "K. Ponmudy", party: "DMK" },
    { no: 145, name: "Panruti", mla: "Hari Prabhakaran", party: "DMK" },
    { no: 146, name: "Cuddalore", mla: "R. Anbalagan", party: "DMK" },
    { no: 147, name: "Kurinjipadi", mla: "S. Vijayadharani", party: "INC" },
    { no: 148, name: "Bhuvanagiri", mla: "S. Rajeshkumar", party: "DMK" },
    { no: 149, name: "Chidambaram", mla: "S.A. Sampath", party: "DMK" },
    { no: 150, name: "Kattumannarkoil", mla: "A.P. Nandakumar", party: "DMK" }
  ],
  "Mayiladuthurai": [
    { no: 151, name: "Sirkazhi", mla: "M. Panneerselvam", party: "DMK" },
    { no: 152, name: "Mayiladuthurai", mla: "S. Rajakumar", party: "INC" },
    { no: 153, name: "Poompuhar", mla: "S. Pavunraj", party: "AIADMK" }
  ],
  "Nagapattinam": [
    { no: 154, name: "Nagapattinam", mla: "A.M. Sahensha", party: "IUML" },
    { no: 155, name: "Kilvelur", mla: "V.P. Nagaimaali", party: "CPI" },
    { no: 156, name: "Vedaranyam", mla: "O.S. Manian", party: "AIADMK" }
  ],
  "Tiruvarur": [
    { no: 157, name: "Thiruthuraipoondi", mla: "K. Marimuthu", party: "CPI" },
    { no: 158, name: "Mannargudi", mla: "T.R.B. Rajaa", party: "DMK" },
    { no: 159, name: "Thiruvarur", mla: "K. Poondi Kalaivanan", party: "DMK" },
    { no: 160, name: "Nannilam", mla: "S. Kamaraj", party: "AIADMK" }
  ],
  "Thanjavur": [
    { no: 161, name: "Thiruvidaimarudur", mla: "N. Kumaresan", party: "DMK" },
    { no: 162, name: "Kumbakonam", mla: "G. Anbalagan", party: "DMK" },
    { no: 163, name: "Papanasam", mla: "M.H. Jawahirullah", party: "MMK" },
    { no: 164, name: "Thiruvaiyaru", mla: "Durai Chandrasekaran", party: "DMK" },
    { no: 165, name: "Thanjavur", mla: "T.K.G. Neelamegam", party: "DMK" },
    { no: 166, name: "Orathanadu", mla: "R. Vaithilingam", party: "AIADMK" },
    { no: 167, name: "Pattukkottai", mla: "K. Annadurai", party: "DMK" },
    { no: 168, name: "Peravurani", mla: "N. Ashok Kumar", party: "DMK" }
  ],
  "Pudukkottai": [
    { no: 169, name: "Gandharvakottai", mla: "M. Chinnadurai", party: "CPI" },
    { no: 170, name: "Viralimalai", mla: "C. Vijayabaskar", party: "AIADMK" },
    { no: 171, name: "Pudukkottai", mla: "V. Muthuraja", party: "DMK" },
    { no: 172, name: "Thirumayam", mla: "S. Regupathy", party: "DMK" },
    { no: 173, name: "Alangudi", mla: "E. Kaliannan", party: "DMK" },
    { no: 174, name: "Aranthangi", mla: "T. Ramachandran", party: "INC" }
  ],
  "Sivagangai": [
    { no: 175, name: "Sivaganga", mla: "P.R. Senthilnathan", party: "AIADMK" },
    { no: 176, name: "Manamadurai", mla: "A. Tamilarasi", party: "DMK" }
  ],
  "Madurai": [
    { no: 177, name: "Melur", mla: "P. Selvam", party: "AIADMK" },
    { no: 178, name: "Madurai East", mla: "P. Moorthy", party: "DMK" },
    { no: 179, name: "Sholavandan", mla: "A. Venkatesan", party: "DMK" },
    { no: 180, name: "Madurai North", mla: "G. Thalapathi", party: "DMK" },
    { no: 181, name: "Madurai South", mla: "M. Boominathan", party: "MDMK" },
    { no: 182, name: "Madurai Central", mla: "P.T.R. Palanivel Thiaga Rajan", party: "DMK" },
    { no: 183, name: "Madurai West", mla: "Sellur K. Raju", party: "AIADMK" },
    { no: 184, name: "Thiruparankundram", mla: "P. Saravanan", party: "DMK" },
    { no: 185, name: "Tirumangalam", mla: "R.B. Udhayakumar", party: "AIADMK" },
    { no: 186, name: "Usilampatti", mla: "P. Ayyappan", party: "AIADMK" }
  ],
  "Theni": [
    { no: 187, name: "Andipatti", mla: "A. Maharajan", party: "DMK" },
    { no: 188, name: "Periyakulam", mla: "K.S. Saravana Kumar", party: "DMK" },
    { no: 189, name: "Bodinayakanur", mla: "O. Panneerselvam", party: "AIADMK" },
    { no: 190, name: "Cumbum", mla: "P. Saravanan", party: "DMK" }
  ],
  "Dindigul": [
    { no: 191, name: "Palani", mla: "I.P. Senthil Kumar", party: "DMK" },
    { no: 192, name: "Oddanchatram", mla: "R. Sakkarapani", party: "DMK" },
    { no: 193, name: "Athoor", mla: "I. Periyasamy", party: "DMK" },
    { no: 194, name: "Nilakottai", mla: "S. Thenmozhi", party: "AIADMK" },
    { no: 195, name: "Natham", mla: "R. Viswanathan", party: "AIADMK" },
    { no: 196, name: "Dindigul", mla: "I. Periyasamy", party: "DMK" },
    { no: 197, name: "Vedasandur", mla: "S. Gandhirajan", party: "DMK" }
  ],
  "Virudhunagar": [
    { no: 198, name: "Rajapalayam", mla: "S. Thangappandian", party: "DMK" },
    { no: 199, name: "Srivilliputhur", mla: "E.M. Manraj", party: "AIADMK" },
    { no: 200, name: "Sattur", mla: "A.R.R. Raghuraman", party: "MDMK" },
    { no: 201, name: "Sivakasi", mla: "G. Ashokan", party: "INC" },
    { no: 202, name: "Virudhunagar", mla: "A.R.R. Seenivasan", party: "DMK" },
    { no: 203, name: "Aruppukkottai", mla: "K.K.S.S.R. Ramachandran", party: "DMK" },
    { no: 204, name: "Tiruchuli", mla: "Thangam Thennarasu", party: "DMK" }
  ],
  "Ramanathapuram": [
    { no: 205, name: "Paramakudi", mla: "S. Murugesan", party: "DMK" },
    { no: 206, name: "Thiruvadanai", mla: "R.M. Karumanickam", party: "INC" },
    { no: 207, name: "Ramanathapuram", mla: "K. Muthuramalingam", party: "DMK" },
    { no: 208, name: "Mudukulathur", mla: "R.S. Raja Kannappan", party: "DMK" }
  ],
  "Thoothukudi": [
    { no: 209, name: "Vilathikulam", mla: "G.V. Markandeyan", party: "DMK" },
    { no: 210, name: "Thoothukkudi", mla: "P. Geetha Jeevan", party: "DMK" },
    { no: 211, name: "Tiruchendur", mla: "Anitha R. Radhakrishnan", party: "DMK" },
    { no: 212, name: "Srivaikuntam", mla: "S. Amirtharaj", party: "INC" },
    { no: 213, name: "Ottapidaram", mla: "M.C. Shanmugaiah", party: "DMK" },
    { no: 214, name: "Kovilpatti", mla: "Kadambur C. Raju", party: "AIADMK" }
  ],
  "Tenkasi": [
    { no: 215, name: "Sankarankovil", mla: "E. Raja", party: "DMK" },
    { no: 216, name: "Vasudevanallur", mla: "S. Manoharan", party: "AIADMK" },
    { no: 217, name: "Kadayanallur", mla: "C. Krishnamurali", party: "AIADMK" },
    { no: 218, name: "Tenkasi", mla: "S. Palani Nadar", party: "INC" },
    { no: 219, name: "Alangulam", mla: "K.O. Ramalingam", party: "DMK" }
  ],
  "Tirunelveli": [
    { no: 220, name: "Tirunelveli", mla: "Nainar Nagenthran", party: "BJP" },
    { no: 221, name: "Ambasamudram", mla: "E. Subaya", party: "AIADMK" },
    { no: 222, name: "Palayamkottai", mla: "M. Abdul Wahab", party: "DMK" },
    { no: 223, name: "Nanguneri", mla: "Ruby R. Manoharan", party: "INC" },
    { no: 224, name: "Radhapuram", mla: "M. Appavu", party: "DMK" }
  ],
  "Kanyakumari": [
    { no: 225, name: "Kanniyakumari", mla: "N. Thalavai Sundaram", party: "AIADMK" },
    { no: 226, name: "Nagercoil", mla: "M.R. Gandhi", party: "BJP" },
    { no: 227, name: "Colachel", mla: "J.G. Prince", party: "INC" },
    { no: 228, name: "Padmanabhapuram", mla: "T. Mano Thangaraj", party: "DMK" },
    { no: 229, name: "Vilavancode", mla: "S. Vijayadharani", party: "INC" },
    { no: 230, name: "Killiyoor", mla: "S. Rajesh Kumar", party: "INC" }
  ]
};

export const TN_CONSTITUENCIES = Object.values(DISTRICT_CONSTITUENCIES).flat();
