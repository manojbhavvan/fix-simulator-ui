export const certificationRunMock = {
  runId: "CERT-20260123-0008",
  logId: "orderflow.log",
  status: "FAILED",

  messages: [
    /* ---------------- Logon ---------------- */
    {
      id: 1,
      type: "Logon",
      msgType: "A",
      status: "PASS",

      details: {
        fixVersion: "FIX.4.2",
        msgType: "A",
        sequenceNumber: 1,
        requiredTags: ["98", "108"],
        missingTags: [],
        presentTags: ["98", "108", "141"]
      },

      rawFix:
        "8=FIX.4.2|9=65|35=A|49=CLIENT1|56=HUB1|98=0|108=30|141=Y|10=004"
    },

    /* ---------------- New Order Single ---------------- */
    {
      id: 2,
      type: "New Order Single",
      msgType: "D",
      status: "FAIL",

      details: {
        fixVersion: "FIX.4.2",
        msgType: "D",
        sequenceNumber: 2,

        requiredTags: ["11", "21", "38", "40", "54", "55"],
        missingTags: ["11", "38"],
        presentTags: ["21", "40", "54", "55"],

        validationErrors: [
          "Missing mandatory tag ClOrdID (11)",
          "Missing mandatory tag OrderQty (38)"
        ]
      },

      analysis: {
        summary:
          "Order is missing ClOrdID (11) and OrderQty (38), both of which are mandatory for a New Order Single (35=D).",

        explanation: [
          "ClOrdID (11) uniquely identifies the order from the client.",
          "OrderQty (38) specifies the quantity to trade.",
          "Without these fields, the order cannot be processed by the counterparty."
        ],

        suggestedFix:
          "35=D|11=12345|21=1|55=AAPL|54=1|38=100|40=2",

        possibleReason:
          "The client application likely did not populate mandatory fields when constructing the order message.",

        recommendation:
          "Ensure all mandatory FIX tags are validated before sending orders."
      },

      rawFix:
        "8=FIX.4.2|9=112|35=D|49=CLIENT1|56=HUB1|21=1|55=AAPL|54=1|40=2|10=128"
    },

    /* ---------------- Execution Report ---------------- */
    {
      id: 3,
      type: "Execution Report",
      msgType: "8",
      status: "PASS",

      details: {
        fixVersion: "FIX.4.2",
        msgType: "8",
        sequenceNumber: 3,
        requiredTags: ["37", "39", "150"],
        missingTags: [],
        presentTags: ["37", "39", "150", "17"]
      },

      rawFix:
        "8=FIX.4.2|9=85|35=8|49=HUB1|56=CLIENT1|37=ORDER123|39=0|150=0|10=211"
    }
  ],

  /* ---------------- Session / Sequence Flow ---------------- */
  sequenceFlow: {
    nodes: [
      "Logon (A)",
      "Heartbeat (0)",
      "New Order Single (D)",
      "Execution Report (8)"
    ],

    issues: [
      {
        type: "Missing Heartbeat",
        description:
          "No Heartbeat (0) message was sent between the Logon (A) and New Order Single (D)."
      },
      {
        type: "Seq Gap Detected",
        description:
          "There is a sequence number gap between the Logon and New Order messages."
      },
      {
        type: "No Logout",
        description:
          "No Logout (5) message was sent at the end of the session."
      }
    ],

    insights: [
      "Ensure a Heartbeat (0) message is sent regularly after Logon (A) to maintain session integrity.",
      "Sequence numbers must be strictly incremental to avoid session desynchronization.",
      "A Logout (5) message should always be sent to properly close the FIX session."
    ]
  }
};
