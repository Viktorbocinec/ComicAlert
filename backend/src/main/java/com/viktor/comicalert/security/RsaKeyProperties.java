package com.viktor.comicalert.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties("rsa")
public record RsaKeyProperties(RSAPrivateKey privateKey, RSAPublicKey publicKey) {
}

//public record RsaKeyProperties(
//        @Value("${rsa.private-key}") RSAPrivateKey privateKey,
//        @Value("${rsa.public-key}") RSAPublicKey publicKey) {
//}