import { TeamsActivityHandler, TurnContext } from "botbuilder";
import io from 'socket.io-client';

// export class TeamsBot extends TeamsActivityHandler {
//   private socket: any;
//   constructor() {
//     super();
//     this.onMessage(async (context, next) => {
//       console.log("Running with Message Activity.", this);
//       const removedMentionText = TurnContext.removeRecipientMention(context.activity);
//       const txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
//       console.log(txt, "TEXT")
//       const message = "How can i help you"
//       await context.sendActivity(` ${message}`);
//       // By calling next() you ensure that the next BotHandler is run.
//       await next();
//     });

//     this.onMembersAdded(async (context, next) => {
//       const membersAdded = context.activity.membersAdded;
//       for (let cnt = 0; cnt < membersAdded.length; cnt++) {
//         if (membersAdded[cnt].id) {
//           await context.sendActivity(
//             `Hi there! I'm a Teams bot that will echo what you said to me.`
//           );
//           break;
//         }
//       }
//       await next();
//     });
//   }


// }


export class TeamsBot extends TeamsActivityHandler {
  private socket: any;

  constructor() {
    super();
    this.socket = io("https://chatrouter.endlessriver.ai");

    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.socket.on("queryReceived", (data: any) => {
      console.log("Query received:", data);
    });
    this.socket.once("userId_teams", (data: any) => {
      console.log("USERID_TEAMS", data)
    });
    // socket.on("userId_teams", (data) => {
    //   addMessage(data, false);
    //   saveMessage(data, false);
    // });

    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.", context);
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      const txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      console.log(txt, "TEXT");
      await context.sendActivity(`Heloo ${txt}`);

        // const response = await new Promise((resolve) => {
        //   this.socket.emit("query", {
        //     source: "web",
        //     userId: 'user1' || context.activity.from.id,
        //     query: txt,
        //     time: new Date().toLocaleTimeString(),
        //   });

        //   this.socket.once("userId_teams", (data: any) => {
        //     console.log("USERID_TEAMS", data)
        //     resolve(data);
        //   });
        // });

        // console.log("RESPONSE", response)

      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          await context.sendActivity(
            `Hi there! I'm a Teams bot that will respond to your messages.`
          );
          break;
        }
      }
      await next();
    });
  }
}

// const socket = io("https://chatrouter.endlessriver.ai");

//             socket.on("connect", () => {
//                 console.log("Connected to server");
//                 loadChatHistory();
//             });

//             socket.on("queryReceived", (data) => {
//                 console.log("Query received:", data);
//             });

//             socket.on("userId_teams", (data) => {
//                 addMessage(data, false);
//                 saveMessage(data, false);
//             });

//             function sendQuery() {
//                 const query = document.getElementById("queryInput").value;
//                 if (query.trim() !== "") {
//                     const messageData = {
//                         source: "web",
//                         userId: "user1",
//                         query: query,
//                         time: new Date().toLocaleTimeString(),
//                     };
//                     socket.emit("query", messageData);
//                     addMessage(messageData, true);
//                     saveMessage(messageData, true);
//                     document.getElementById("queryInput").value = "";
//                 }
//             }