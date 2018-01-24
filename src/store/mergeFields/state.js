export default {
  mergeFields: [
    {
      category: 'Contact fields (Most common)',
      fields: [
        {
          label: 'First Name',
          value: '~Contact.FirstName~',
        },
        {
          label: 'Last Name',
          value: '~Contact.LastName~',
        },
        {
          label: 'Email',
          value: '~Contact.Email~',
        },
        {
          label: 'Title',
          value: '~Contact.Title~',
        },
        {
          label: 'Company',
          value: '~Contact.Company~',
        },
        {
          label: 'Phone 1',
          value: '~Contact.Phone1~',
        },
      ],
    },
    {
      category: 'Owner fields (Most common)',
      fields: [
        {
          label: 'First Name',
          value: '~Owner.FirstName~',
        },
        {
          label: 'Last Name',
          value: '~Owner.LastName~',
        },
        {
          label: 'Email',
          value: '~Owner.Email~',
        },
      ],
    },
    {
      category: 'Logged in user fields (Most common)',
      fields: [
        {
          label: 'First Name',
          value: '~LoggedInUser.FirstName~',
        },
        {
          label: 'Last Name',
          value: '~LoggedInUser.LastName~',
        },
        {
          label: 'Email',
          value: '~LoggedInUser.Email~',
        },
        {
          label: 'HTML Signature',
          value: '~LoggedInUser.HtmlSignature~',
        },
      ],
    },
    {
      category: 'Date fields',
      fields: [
        {
          label: 'Current Date',
          value: '~Date.Current~',
        },
        {
          label: 'Current Day of Week',
          value: '~Date.DayOfWeek~',
        },
        {
          label: 'Current Day of Month',
          value: '~Contact.DayOfMonth~',
        },
        {
          label: 'Current Month',
          value: '~Date.Month~',
        },
        {
          label: 'Current Month of Year',
          value: '~Date.MonthOfYear~',
        },
        {
          label: 'Current Year',
          value: '~Date.Year~',
        },
      ],
    },
  ],
};
