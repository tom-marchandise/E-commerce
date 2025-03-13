using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace Ecommerce.Helpers
{
    public static class OtpHelper
    {
        private static readonly Dictionary<int, (string Otp, DateTime Expiration)> OtpStore = new();

        public static string GenerateOtp()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                var bytes = new byte[4];
                rng.GetBytes(bytes);
                int number = BitConverter.ToInt32(bytes, 0) & 0x7FFFFFFF;
                return (number % 1000000).ToString("D6");
            }
        }

        public static void StoreOtp(int userId, string otp)
        {
            var expiration = DateTime.UtcNow.AddMinutes(10);
            OtpStore[userId] = (Otp: otp, Expiration: expiration);
        }

        public static bool ValidateOtp(int userId, string otp)
        {
            if (OtpStore.TryGetValue(userId, out var otpData))
            {
                if (DateTime.UtcNow <= otpData.Expiration && otpData.Otp == otp)
                {
                    OtpStore.Remove(userId);
                    return true;
                }
            }
            return false;
        }
    }
}